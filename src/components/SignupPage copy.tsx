import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/SignupPage.css";
import thumbnail from "../images/thumbnail.jpg";

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);

  const isUsernameValid = /^[a-z0-9]{1,20}$/.test(username);
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{6,}$/.test(password);
  const isPhoneValid = /^[0-9]*$/.test(phone);
  const isPasswordMatch = password === confirmPassword;

  const isButtonEnabled =
    username.trim() !== "" &&
    password.trim() !== "" &&
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
    if (username === "existinguser") {
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
      e.target.value !== password ? "비밀번호가 동일하지 않습니다." : ""
    );
  };

  return (
    <div className="signup-container">
      <Link to="/login" className="signup-thumbnail-space">
        <img src={thumbnail} alt="썸네일" />
      </Link>

      <form method="POST" className="signup-form">
        {/* 아이디 입력 및 중복확인 버튼 */}
        <div className="signup-username-container">
          <input
            type="text"
            placeholder="아이디 (소문자 및 숫자 조합, 최대 20자)"
            className="signup-input-field username-input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsUsernameChecked(false);
              setUsernameMessage("");
            }}
          />
          <button
            type="button"
            className="check-duplicate-button"
            onClick={handleCheckDuplicate}
            disabled={!isUsernameValid || username.trim() === ""}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          className={`signup-button ${isButtonEnabled ? "enabled" : ""}`}
          disabled={!isButtonEnabled}
        >
          회원가입 완료
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
