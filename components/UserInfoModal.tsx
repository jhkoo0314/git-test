import React, { useState, useEffect } from "react";

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userInfo: { name: string; email: string }) => void;
  isSubmitting?: boolean;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setErrors({});
    }
  }, [isOpen]);

  // 이메일 유효성 검사
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 입력값 검증
  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 이름 입력 처리
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    // 실시간 검증
    if (value.trim() && errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  // 이메일 입력 처리
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // 실시간 검증
    if (value.trim() && errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  // 확인 버튼 클릭
  const handleConfirm = () => {
    if (!validateForm()) {
      return;
    }

    console.log("👤 사용자 정보 수집:", { name, email }); // 로그 추가

    onConfirm({ name: name.trim(), email: email.trim() });
  };

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* 모달 컨테이너 */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  🚀 상세 리포트 기능 준비 중
                </h3>
                <p className="text-primary-100 text-sm mt-1">
                  출시 소식을 가장 먼저 받아보세요!
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="text-white/80 hover:text-white transition-colors disabled:opacity-50"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="p-6">
            {/* 안내 메시지 */}
            <div className="mb-6 p-5 bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg border-2 border-primary-200">
              <div className="text-center">
                <div className="text-4xl mb-3">📊✨</div>
                <h4 className="text-lg font-bold text-primary-900 mb-2">
                  정식 출시가 되면 알려 드리겠습니다
                </h4>
                <p className="text-sm text-primary-700 leading-relaxed">
                  상세 리포트 기능이 곧 출시됩니다.
                  <br />
                  이메일을 남겨주시면 정식 출시 소식을 가장 먼저 전해드립니다.
                </p>
              </div>
            </div>

            {/* 이름 입력 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="이름을 입력하세요"
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 focus:border-blue-500"
                } ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* 이메일 입력 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일을 입력하세요"
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 focus:border-blue-500"
                } ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* 버튼들 */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                disabled={
                  isSubmitting ||
                  !name.trim() ||
                  !email.trim() ||
                  Object.keys(errors).length > 0
                }
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isSubmitting ||
                  !name.trim() ||
                  !email.trim() ||
                  Object.keys(errors).length > 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700 text-white"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    처리 중...
                  </div>
                ) : (
                  "🔔 출시 알림 신청"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
