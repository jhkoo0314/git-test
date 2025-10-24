"use client";

import { useState } from "react";

/**
 * 이메일 전송 모달 컴포넌트
 * 사용자가 입찰 결과나 리포트를 이메일로 전송할 수 있습니다
 * notificationMode가 true일 경우 정식 출시 알림 신청 폼으로 동작합니다
 */

interface EmailSendModalProps {
  /** 모달 표시 여부 */
  isOpen: boolean;
  /** 모달 닫기 함수 */
  onClose: () => void;
  /** 이메일 제목 (기본값 제공) */
  defaultSubject?: string;
  /** 이메일 내용 (기본값 제공) */
  defaultContent?: string;
  /** HTML 내용 (선택사항) */
  defaultHtml?: string;
  /** 알림 모드 (true일 경우 정식 출시 알림 신청 폼 표시) */
  notificationMode?: boolean;
  /** 알림 메시지 (notificationMode가 true일 때 표시할 메시지) */
  notificationMessage?: string;
}

export default function EmailSendModal({
  isOpen,
  onClose,
  defaultSubject = "",
  defaultContent = "",
  defaultHtml = "",
  notificationMode = false,
  notificationMessage = "",
}: EmailSendModalProps) {
  // 이메일 전송 모드를 위한 상태
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [content, setContent] = useState(defaultContent);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // 알림 모드를 위한 상태
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  // 이메일 유효성 검사
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일 전송 처리
  const handleSendEmail = async () => {
    console.log("📧 이메일 전송 시작", { to, subject });
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          text: content,
          html: defaultHtml || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ 이메일 전송 성공");
        setIsSuccess(true);
        setMessage("이메일이 성공적으로 전송되었습니다! 🎉");

        // 2초 후 모달 닫기
        setTimeout(() => {
          onClose();
          // 상태 초기화
          setTo("");
          setSubject(defaultSubject);
          setContent(defaultContent);
          setMessage("");
          setIsSuccess(false);
        }, 2000);
      } else {
        console.log("❌ 이메일 전송 실패:", data.error);
        setIsSuccess(false);
        setMessage(`전송 실패: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ 이메일 전송 오류:", error);
      setIsSuccess(false);
      setMessage("이메일 전송 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 사용자 정보 제출 처리
  const handleSubmitUserInfo = async () => {
    console.log("📝 사용자 정보 제출 시작", { userName, userEmail });

    // 유효성 검사
    const errors: { name?: string; email?: string } = {};
    if (!userName.trim()) {
      errors.name = "이름을 입력해주세요.";
    }
    if (!userEmail.trim()) {
      errors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(userEmail)) {
      errors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const response = await fetch("/api/collect-user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName.trim(),
          email: userEmail.trim(),
          propertyTitle: "정식 출시 알림 신청",
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ 사용자 정보 저장 성공");
        setSubmitSuccess(true);

        // 2초 후 모달 닫기
        setTimeout(() => {
          onClose();
          // 상태 초기화
          setUserName("");
          setUserEmail("");
          setSubmitSuccess(false);
        }, 2000);
      } else {
        console.error("❌ 사용자 정보 저장 실패:", data.error);
        setFormErrors({
          email: data.error || "정보 저장에 실패했습니다.",
        });
      }
    } catch (error) {
      console.error("❌ 사용자 정보 저장 오류:", error);
      setFormErrors({
        email: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  // 알림 모드일 경우 정식 출시 알림 신청 폼 표시
  if (notificationMode) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-8 animate-fade-in">
          {submitSuccess ? (
            // 성공 메시지
            <>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 animate-bounce-gentle">✅</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  등록 완료!
                </h2>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
                <p className="text-center text-lg text-gray-700 leading-relaxed">
                  정식 출시 시 알림을 보내드리겠습니다. 😊
                </p>
              </div>
            </>
          ) : (
            // 입력 폼
            <>
              {/* 아이콘 */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 animate-bounce-gentle">🔔</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  출시 예정 기능
                </h2>
              </div>

              {/* 알림 메시지 */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-center text-lg text-gray-700 leading-relaxed mb-4">
                  {notificationMessage || "정식출시가 되면 알려 드리겠습니다."}
                </p>
                <p className="text-sm text-gray-600 text-center">
                  정보를 남겨주시면 출시 소식을 가장 먼저 알려드립니다!
                </p>
              </div>

              {/* 이름 입력 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (formErrors.name && e.target.value.trim()) {
                      setFormErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  placeholder="이름을 입력하세요"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.name
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  } ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
                {formErrors.name && (
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
                    {formErrors.name}
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
                  value={userEmail}
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                    if (formErrors.email && e.target.value.trim()) {
                      setFormErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  placeholder="이메일을 입력하세요"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  } ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
                {formErrors.email && (
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
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* 버튼들 */}
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  취소
                </button>
                <button
                  onClick={handleSubmitUserInfo}
                  disabled={
                    isSubmitting || !userName.trim() || !userEmail.trim()
                  }
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      처리 중...
                    </div>
                  ) : (
                    "알림 신청"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // 이메일 전송 모드
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">📧 이메일 전송</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        {/* 입력 폼 */}
        <div className="space-y-4">
          {/* 수신자 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              수신자 이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
              required
            />
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="이메일 제목을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
              required
            />
          </div>

          {/* 내용 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="이메일 내용을 입력하세요"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={isLoading}
              required
            />
          </div>

          {/* 메시지 표시 */}
          {message && (
            <div
              className={`p-3 rounded-md text-sm ${
                isSuccess
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              onClick={handleSendEmail}
              disabled={isLoading || !to || !subject || !content}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "전송 중..." : "전송하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
