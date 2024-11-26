import React, { useState } from "react";
import "../css/LoginPage.css";
import "../css/SignupPage.css";
import thumbnail from "../images/thumbnail.jpg";

const LoginPage: React.FC = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [LoginDisplay, setLoginDisplay] = useState(true);
  const [SignupDisplay, setSignupDisplay] = useState(false);
  const handleLoginToSignup = () => {
    setIsLoginPage(false);
    setTimeout(() => {
      setLoginDisplay(false);
      setSignupDisplay(true);
    }, 500);
  };
  const handleSignupToLogin = () => {
    setIsLoginPage(true);
    setTimeout(() => {
      setLoginDisplay(true);
      setSignupDisplay(false);
    }, 500);
  };
  // 로그인 컨테이너 JS
  const [LoginUsername, setLoginUsername] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");

  // 비활성화 상태 관리
  const isLoginButtonEnabled =
    LoginUsername.trim() !== "" && LoginPassword.trim() !== "";

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 경계선 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // 회원가입 컨테이너 JS
  const [SignupUsername, setSignupUsername] = useState("");
  const [SignupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);

  const isUsernameValid = /^[a-z0-9]{1,20}$/.test(SignupUsername);
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{6,}$/.test(
      SignupPassword
    );
  const isPhoneValid = /^[0-9]*$/.test(phone);
  const isPasswordMatch = SignupPassword === confirmPassword;

  const isSignupButtonEnabled =
    SignupUsername.trim() !== "" &&
    SignupPassword.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    phone.trim() !== "" &&
    email.trim() !== "" &&
    isUsernameValid &&
    isPasswordValid &&
    isPhoneValid &&
    isPasswordMatch &&
    isUsernameChecked &&
    !usernameMessage.includes("불가능");

  // 중복 확인 함수
  const handleCheckDuplicate = () => {
    if (SignupUsername === "existinguser") {
      setUsernameMessage("사용 불가능한 아이디 입니다.");
    } else {
      setUsernameMessage("사용 가능한 아이디 입니다.");
    }
    setIsUsernameChecked(true);
  };

  // 비밀번호 확인 메시지 업데이트
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordMatchMessage(
      e.target.value !== SignupPassword ? "비밀번호가 동일하지 않습니다." : ""
    );
  };

  return (
    <div className="main-frame">
      {/* 로그인 컨테이너 */}
      <div
        className={`${
          isLoginPage ? "login-container" : "login-container-rotate"
        }`}
        style={{ display: LoginDisplay ? "flex" : "none" }}
      >
        <div className="login-thumbnail-space">
          <img src={thumbnail} alt="thumbnail" />
        </div>

        <form method="POST" className="login-form">
          <input
            type="text"
            placeholder="사용자 이름, 전화번호 또는 이메일 주소"
            className="login-input-field"
            value={LoginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="login-input-field"
            value={LoginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button
            type="submit"
            className={`login-button ${isLoginButtonEnabled ? "enabled" : ""}`}
            disabled={!isLoginButtonEnabled}
          >
            로그인
          </button>
          <div className="login-extra-links">
            <span onClick={handleLoginToSignup} className="login-signup-link">
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
      {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 경계선 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      {/* 회원가입 컨테이너 */}
      <div
        className={`${
          !isLoginPage ? "signup-container" : "signup-container-rotate"
        }`}
        style={{ display: SignupDisplay ? "flex" : "none" }}
      >
        <div className="signup-thumbnail-space">
          <img onClick={handleSignupToLogin} src={thumbnail} alt="썸네일" />
        </div>
        <form method="POST" className="signup-form">
          {/* 아이디 입력 및 중복확인 버튼 */}
          <div className="signup-username-container">
            <input
              type="text"
              placeholder="아이디 (소문자 및 숫자 조합, 최대 20자)"
              className="signup-input-field username-input"
              value={SignupUsername}
              onChange={(e) => {
                setSignupUsername(e.target.value);
                setIsUsernameChecked(false);
                setUsernameMessage("");
              }}
            />
            <button
              type="button"
              className="check-duplicate-button"
              onClick={handleCheckDuplicate}
              disabled={!isUsernameValid || SignupUsername.trim() === ""}
            >
              중복확인
            </button>
          </div>
          {usernameMessage && (
            <p
              className={`username-message ${
                usernameMessage.includes("불가능") ? "invalid" : "valid"
              }`}
            >
              {usernameMessage}
            </p>
          )}

          {/* 비밀번호 입력 */}
          <input
            type="password"
            placeholder="비밀번호 (소문자+숫자+특수문자, 최소 6자)"
            className="signup-input-field"
            value={SignupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />

          {/* 비밀번호 확인 입력 */}
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="signup-input-field"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {passwordMatchMessage && (
            <p className="password-match-message invalid">
              {passwordMatchMessage}
            </p>
          )}

          {/* 전화번호 입력 */}
          <input
            type="tel"
            placeholder="전화번호"
            className="signup-input-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* 이메일 입력 */}
          <input
            type="email"
            placeholder="이메일"
            className="signup-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className={`signup-button ${
              isSignupButtonEnabled ? "enabled" : ""
            }`}
            disabled={!isSignupButtonEnabled}
          >
            회원가입 완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
