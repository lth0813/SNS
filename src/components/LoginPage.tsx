import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";
import thumbnail from "../images/thumbnail.jpg";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const navigate = useNavigate();

  // 비활성화 상태 관리
  const isButtonEnabled = username.trim() !== "" && password.trim() !== "";

  // 회원가입 버튼 클릭 시 상태 업데이트 후 페이지 이동 지연
  const handleSignupClick = () => {
    setIsSignupClicked(true);
    setTimeout(() => navigate("/signup"), 500); // 0.5초 후 페이지 이동
  };

  return (
    <div className={`login-container ${isSignupClicked ? "rotate-out" : ""}`}>
      <div className="login-thumbnail-space">
        <img src={thumbnail} alt="thumbnail" />
      </div>

      <form method="POST" className="login-form">
        <input
          type="text"
          placeholder="사용자 이름, 전화번호 또는 이메일 주소"
          className="login-input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="login-input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className={`login-button ${isButtonEnabled ? "enabled" : ""}`}
          disabled={!isButtonEnabled}
        >
          로그인
        </button>
        <div className="login-extra-links">
          <span onClick={handleSignupClick} className="login-signup-link">
            회원가입
          </span>
          <span className="login-separator">|</span>
          <a href="#" className="login-forgot-password">
            비밀번호를 잊으셨나요?
          </a>
        </div>
        <div className="login-divider">
          <hr /> <span>또는</span> <hr />
        </div>
        <button className="login-google-button">구글로 로그인</button>
        <button className="login-kakao-button">카카오로 로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
