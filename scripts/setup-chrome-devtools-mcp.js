#!/usr/bin/env node

/**
 * Chrome DevTools MCP 설정 스크립트
 * 이 스크립트는 Chrome DevTools MCP를 설정하고 Chrome을 디버깅 모드로 시작합니다.
 */

const { spawn, exec } = require("child_process");
const path = require("path");

console.log("🔧 Chrome DevTools MCP 설정을 시작합니다...");

// Chrome DevTools MCP 서버 설치
function installChromeDevToolsMCP() {
  return new Promise((resolve, reject) => {
    console.log("📦 Chrome DevTools MCP 서버를 설치합니다...");

    const install = spawn("npx", ["chrome-devtools-mcp@latest", "--version"], {
      stdio: "inherit",
      shell: true,
    });

    install.on("close", (code) => {
      if (code === 0) {
        console.log("✅ Chrome DevTools MCP 서버 설치 완료");
        resolve();
      } else {
        console.log("❌ Chrome DevTools MCP 서버 설치 실패");
        reject(new Error("설치 실패"));
      }
    });
  });
}

// Chrome을 디버깅 모드로 시작
function startChromeWithDebugging() {
  return new Promise((resolve, reject) => {
    console.log("🌐 Chrome을 디버깅 모드로 시작합니다...");

    const chromePath =
      process.platform === "win32"
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        : process.platform === "darwin"
        ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        : "google-chrome";

    const chromeArgs = [
      "--remote-debugging-port=9222",
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
      "--user-data-dir=" + path.join(__dirname, "../chrome-debug-profile"),
    ];

    const chrome = spawn(chromePath, chromeArgs, {
      stdio: "inherit",
      shell: true,
      detached: true,
    });

    chrome.on("error", (err) => {
      console.log("❌ Chrome 시작 실패:", err.message);
      reject(err);
    });

    // Chrome이 시작될 시간을 줍니다
    setTimeout(() => {
      console.log("✅ Chrome이 디버깅 모드로 시작되었습니다");
      console.log("🔗 디버깅 URL: http://localhost:9222");
      resolve();
    }, 3000);
  });
}

// MCP 서버 시작
function startMCPServer() {
  return new Promise((resolve, reject) => {
    console.log("🚀 MCP 서버를 시작합니다...");

    const mcpServer = spawn("npx", ["chrome-devtools-mcp@latest"], {
      stdio: "inherit",
      shell: true,
    });

    mcpServer.on("error", (err) => {
      console.log("❌ MCP 서버 시작 실패:", err.message);
      reject(err);
    });

    console.log("✅ MCP 서버가 시작되었습니다");
    console.log("📝 이제 AI 도우미와 Chrome DevTools MCP를 사용할 수 있습니다");
    resolve();
  });
}

// 메인 실행 함수
async function main() {
  try {
    console.log("🎯 Bid Master Chrome DevTools MCP 설정");
    console.log("=====================================");

    // 1. Chrome DevTools MCP 설치
    await installChromeDevToolsMCP();

    // 2. Chrome을 디버깅 모드로 시작
    await startChromeWithDebugging();

    // 3. MCP 서버 시작
    await startMCPServer();
  } catch (error) {
    console.error("❌ 설정 중 오류가 발생했습니다:", error.message);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = {
  installChromeDevToolsMCP,
  startChromeWithDebugging,
  startMCPServer,
};
