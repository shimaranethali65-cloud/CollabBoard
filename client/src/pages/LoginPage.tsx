import React, { useState } from "react";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="login-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          background: #ffffff;
          color: #111111;
        }

        /* =========================
           PAGE
        ========================= */

        .login-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* =========================
           HEADER
        ========================= */

        .login-header {
          width: 700px;
          max-width: calc(100% - 40px);
          margin-top: 68px;

          display: flex;
          align-items: center;
          gap: 28px;

          position: relative;
          z-index: 2;
        }

        .login-icon-box {
          width: 108px;
          height: 96px;

          flex-shrink: 0;

          background: #e5efff;
          border-radius: 10px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lock-icon {
          font-size: 52px;
          line-height: 1;
          color: #087cff;
        }

        .header-text h1 {
          margin: 0 0 6px;

          font-size: 34px;
          line-height: 1.1;
          font-weight: 700;
        }

        .welcome-black {
          color: #111111;
        }

        .welcome-blue {
          color: #91c7e8;
        }

        .header-text p {
          margin: 0;

          font-size: 20px;
          line-height: 1.3;
          font-weight: 600;
          color: #666666;
        }

        /* =========================
           LOGIN CARD
        ========================= */

        .login-card {
          width: 438px;
          min-height: 378px;

          margin-top: 42px;

          padding: 25px 29px 25px;

          background: #eaf2ff;

          border-radius: 2px;

          box-shadow:
            0 8px 18px rgba(0, 0, 0, 0.18);

          position: relative;
          z-index: 2;
        }

        /* =========================
           FORM
        ========================= */

        .form-group {
          width: 100%;
          margin-bottom: 27px;
        }

        .form-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 9px;
        }

        .form-label {
          font-size: 19px;
          font-weight: 700;
          color: #111111;
        }

        .forgot-password {
          border: none;
          background: transparent;

          padding: 0;

          font-size: 16px;
          font-weight: 600;

          color: #91c7e8;

          cursor: pointer;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        /* =========================
           INPUT
        ========================= */

        .input-wrapper {
          width: 100%;
          height: 39px;

          display: flex;
          align-items: center;

          background: #ffffff;

          border: 1px solid #d7d7d7;
          border-radius: 7px;

          padding: 0 12px;

          transition: border-color 0.2s;
        }

        .input-wrapper:focus-within {
          border-color: #8fc9ec;
        }

        .input-icon {
          width: 22px;
          margin-right: 7px;

          color: #888888;
          font-size: 17px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .input-wrapper input {
          flex: 1;

          width: 100%;
          height: 100%;

          border: none;
          outline: none;

          background: transparent;

          font-size: 14px;
          color: #333333;
        }

        .input-wrapper input::placeholder {
          color: #999999;
        }

        .password-toggle {
          border: none;
          background: transparent;

          padding: 0;

          color: #888888;

          font-size: 17px;

          cursor: pointer;
        }

        /* =========================
           REMEMBER ME
        ========================= */

        .remember-row {
          display: flex;
          align-items: center;

          gap: 14px;

          margin-top: -4px;
          margin-bottom: 22px;
        }

        .remember-checkbox {
          width: 16px;
          height: 16px;

          margin: 0;

          cursor: pointer;
          accent-color: #8fc9ec;
        }

        .remember-label {
          font-size: 14px;
          font-weight: 600;
          color: #555555;

          cursor: pointer;
        }

        /* =========================
           LOGIN BUTTON
        ========================= */

        .login-button {
          width: 328px;
          max-width: 100%;
          height: 35px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin: 0 auto;

          border: none;
          border-radius: 6px;

          background: #8fc9ec;
          color: #ffffff;

          font-size: 17px;
          font-weight: 600;

          cursor: pointer;

          box-shadow:
            0 5px 9px rgba(0, 0, 0, 0.16);

          transition:
            background 0.2s,
            transform 0.2s;
        }

        .login-button:hover {
          background: #78bde5;
          transform: translateY(-1px);
        }

        .login-button:active {
          transform: translateY(0);
        }

        .login-button-icon {
          font-size: 22px;
          margin-right: 12px;
        }

        /* =========================
           SIGN UP
        ========================= */

        .signup-text {
          margin-top: 38px;

          text-align: center;

          font-size: 16px;
          font-weight: 600;

          color: #111111;
        }

        .signup-link {
          margin-left: 8px;

          color: #007cff;

          cursor: pointer;

          text-decoration: none;
        }

        .signup-link:hover {
          text-decoration: underline;
        }

        /* =========================
           DECORATIVE LEFT AREA
        ========================= */

        .left-decoration {
          position: absolute;

          left: 0;
          bottom: 0;

          width: 120px;
          height: 430px;

          background: #f2f7ff;

          border-top-right-radius: 95px;
          border-bottom-right-radius: 95px;

          opacity: 0.9;

          z-index: 0;
        }

        .left-circle {
          position: absolute;

          left: -65px;
          bottom: 120px;

          width: 180px;
          height: 180px;

          background: #eaf3ff;

          border-radius: 50%;
        }

        .left-plant {
          position: absolute;

          left: 25px;
          bottom: 70px;

          font-size: 80px;

          color: #8fbdf0;

          opacity: 0.8;
        }

        .left-books {
          position: absolute;

          left: 0;
          bottom: 0;

          font-size: 55px;

          color: #8ebce9;
        }

        /* =========================
           DECORATIVE RIGHT AREA
        ========================= */

        .right-decoration {
          position: absolute;

          top: 0;
          right: 0;

          width: 128px;
          height: 418px;

          background: #f1f7ff;

          border-bottom-left-radius: 0;

          z-index: 0;
        }

        .right-circle {
          position: absolute;

          right: -55px;
          top: 30px;

          width: 175px;
          height: 175px;

          background: #e6f1ff;

          border-radius: 50%;
        }

        .right-plant {
          position: absolute;

          right: 20px;
          top: 70px;

          font-size: 82px;

          color: #80b4ee;

          opacity: 0.8;
        }

        .right-files {
          position: absolute;

          right: 18px;
          top: 145px;

          font-size: 68px;

          color: #83b8ec;

          opacity: 0.85;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 850px) {
          .login-header {
            width: 650px;
          }

          .left-decoration,
          .right-decoration {
            opacity: 0.45;
          }
        }

        @media (max-width: 650px) {
          .login-header {
            width: calc(100% - 40px);
            margin-top: 35px;
            gap: 15px;
          }

          .login-icon-box {
            width: 75px;
            height: 70px;
          }

          .lock-icon {
            font-size: 38px;
          }

          .header-text h1 {
            font-size: 25px;
          }

          .header-text p {
            font-size: 15px;
          }

          .login-card {
            width: calc(100% - 40px);
            margin-top: 30px;
          }

          .login-button {
            width: 100%;
          }

          .left-decoration,
          .right-decoration {
            display: none;
          }
        }
      `}</style>

      {/* =========================
          LEFT DECORATION
      ========================= */}

      <div className="left-decoration">
        <div className="left-circle"></div>
        <div className="left-plant">🌿</div>
        <div className="left-books">📚</div>
      </div>

      {/* =========================
          RIGHT DECORATION
      ========================= */}

      <div className="right-decoration">
        <div className="right-circle"></div>
        <div className="right-plant">🌿</div>
        <div className="right-files">📁</div>
      </div>

      {/* =========================
          HEADER
      ========================= */}

      <div className="login-header">
        <div className="login-icon-box">
          <span className="lock-icon">🔒</span>
        </div>

        <div className="header-text">
          <h1>
            <span className="welcome-black">Welcome </span>
            <span className="welcome-blue">Back!</span>
          </h1>

          <p>
            Login to your account and continue collaborating with your team.
          </p>
        </div>
      </div>

      {/* =========================
          LOGIN FORM
      ========================= */}

      <div className="login-card">

        {/* EMAIL */}

        <div className="form-group">
          <div className="form-label-row">
            <label className="form-label">
              Email Address
            </label>
          </div>

          <div className="input-wrapper">
            <span className="input-icon">
              ✉
            </span>

            <input
              type="email"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        {/* PASSWORD */}

        <div className="form-group">

          <div className="form-label-row">
            <label className="form-label">
              Password
            </label>

            <button
              type="button"
              className="forgot-password"
            >
              Forgot Password?
            </button>
          </div>

          <div className="input-wrapper">
            <span className="input-icon">
              ♧
            </span>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "◉" : "◉"}
            </button>
          </div>

        </div>

        {/* REMEMBER ME */}

        <div className="remember-row">

          <input
            id="remember"
            type="checkbox"
            className="remember-checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <label
            htmlFor="remember"
            className="remember-label"
          >
            Remember me
          </label>

        </div>

        {/* LOGIN BUTTON */}

        <button
          type="button"
          className="login-button"
        >
          <span className="login-button-icon">
            ⇥
          </span>

          Login
        </button>

        {/* SIGN UP */}

        <div className="signup-text">
          Don’t have an account?

          <span className="signup-link">
            Sign up
          </span>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;