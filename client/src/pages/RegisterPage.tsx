import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import leftImage from "../assets/registerpageleftimg.png";
import rightImage from "../assets/registerpagerightimg.png";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    if (!fullName.trim() || !username.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    navigate("/dashboard");
  };

  return (
    <>
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

        /* =========================================
           PAGE
        ========================================= */

        .register-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
          overflow: hidden;
        }

        /* =========================================
           HEADER
        ========================================= */

        .register-header {
          position: relative;
          z-index: 5;

          display: flex;
          align-items: center;

          width: fit-content;

          margin-left: 50px;
          padding-top: 28px;

          gap: 18px;
        }

        .register-icon {
          width: 90px;
          height: 80px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #eaf2ff;
          border-radius: 9px;
        }

        .register-icon svg {
          width: 58px;
          height: 58px;
        }

        .register-heading {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .register-title {
          margin: 0;

          font-size: 30px;
          line-height: 34px;

          font-weight: 700;

          color: #111111;
        }

        .register-title-blue {
          color: #9bcce9;
        }

        .register-subtitle {
          margin: 4px 0 0;

          font-size: 18px;
          line-height: 23px;

          font-weight: 600;

          color: #666666;
        }

        /* =========================================
           LEFT IMAGE
        ========================================= */

        .register-left-image {
          position: absolute;

          left: 0;
          top: 137px;

          width: 115px;
          height: 390px;

          object-fit: cover;
          object-position: right center;

          z-index: 1;
        }

        /* =========================================
           RIGHT IMAGE
        ========================================= */

        .register-right-image {
          position: absolute;

          right: 0;
          bottom: 0;

          width: 155px;
          height: 220px;

          object-fit: contain;
          object-position: right bottom;

          z-index: 1;
        }

        /* =========================================
           REGISTER CARD
        ========================================= */

        .register-card {
          position: absolute;

          z-index: 4;

          /*
             THIS CENTERS THE CARD
          */
          left: 50%;
          transform: translateX(-50%);

          /*
             POSITION BELOW HEADER
          */
          top: 250px;

          /*
             LARGER SIZE
          */
          width: 620px;

          min-height: 365px;

          padding: 22px 28px 30px;

          background: #edf4ff;

          border-radius: 12px;

          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.16);
        }

        /* =========================================
           FORM ROW
        ========================================= */

        .form-row {
          display: grid;

          grid-template-columns: 1fr 1fr;

          column-gap: 40px;

          margin-bottom: 21px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          margin-bottom: 7px;

          font-size: 15px;
          line-height: 18px;

          font-weight: 700;

          color: #111111;
        }

        /* =========================================
           INPUT
        ========================================= */

        .input-wrapper {
          position: relative;

          width: 100%;
        }

        .form-input {
          width: 100%;
          height: 38px;

          padding: 0 40px 0 38px;

          border: 1px solid #d6d6d6;
          border-radius: 6px;

          background: #ffffff;

          outline: none;

          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;

          color: #333333;
        }

        .form-input::placeholder {
          color: #999999;
        }

        .form-input:focus {
          border-color: #9bcce9;
        }

        /* =========================================
           INPUT ICONS
        ========================================= */

        .input-icon {
          position: absolute;

          left: 11px;
          top: 50%;

          transform: translateY(-50%);

          width: 15px;
          height: 15px;

          color: #999999;

          pointer-events: none;

          z-index: 2;
        }

        /* =========================================
           PASSWORD BUTTON
        ========================================= */

        .password-toggle {
          position: absolute;

          right: 10px;
          top: 50%;

          transform: translateY(-50%);

          width: 20px;
          height: 20px;

          padding: 0;

          border: none;

          background: transparent;

          color: #888888;

          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
        }

        .register-error {
          margin: -12px 0 14px;
          color: #c62828;
          font-size: 12px;
          font-weight: 600;
        }

        .password-toggle svg {
          width: 17px;
          height: 17px;
        }

        /* =========================================
           EMAIL
        ========================================= */

        .email-group {
          margin-bottom: 21px;
        }

        /* =========================================
           TERMS
        ========================================= */

        .terms-row {
          display: flex;
          align-items: center;

          margin-top: 2px;
          margin-bottom: 22px;
        }

        .terms-checkbox {
          width: 15px;
          height: 15px;

          margin: 0 6px 0 0;

          accent-color: #8ec8e8;

          cursor: pointer;
        }

        .terms-text {
          font-size: 12px;
          line-height: 15px;

          color: #222222;
        }

        .terms-link {
          color: #0066cc;
          text-decoration: none;
        }

        .terms-link:hover {
          text-decoration: underline;
        }

        /* =========================================
           CREATE ACCOUNT BUTTON
        ========================================= */

        .create-button {
          width: 100%;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          border: none;
          border-radius: 5px;

          background: #8fc9e9;

          color: #ffffff;

          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;

          cursor: pointer;
        }

        .create-button:hover {
          background: #82c0e2;
        }

        .create-button svg {
          width: 16px;
          height: 16px;
        }

        /* =========================================
           LARGE SCREENS
        ========================================= */

        @media (min-width: 1400px) {
          .register-card {
            width: 650px;
            min-height: 375px;

            padding: 24px 30px 32px;
          }

          .form-row {
            column-gap: 42px;
            margin-bottom: 22px;
          }

          .form-input {
            height: 40px;
            font-size: 14px;
          }

          .form-label {
            font-size: 15px;
          }

          .create-button {
            height: 40px;
          }
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 1000px) {
          .register-header {
            margin-left: 30px;
          }

          .register-card {
  position: absolute;
  z-index: 4;

  left: 50%;
  transform: translateX(-50%);

  top: 250px;

  width: 700px;
  min-height: 400px;

  padding: 28px 34px 34px;

  background: #edf4ff;

  border-radius: 12px;

  box-shadow:
    0 8px 22px rgba(0, 0, 0, 0.16);
}

          .register-left-image {
            width: 90px;
          }

          .register-right-image {
            width: 120px;
          }
        }

        /* =========================================
           SMALL TABLET
        ========================================= */

        @media (max-width: 750px) {
          .register-header {
            margin-left: 20px;
            padding-top: 20px;

            gap: 12px;
          }

          .register-icon {
            width: 70px;
            height: 65px;
          }

          .register-icon svg {
            width: 48px;
            height: 48px;
          }

          .register-title {
            font-size: 25px;
            line-height: 29px;
          }

          .register-subtitle {
            font-size: 14px;
            line-height: 18px;
          }

          .register-card {
            position: relative;

            left: auto;
            transform: none;

            top: auto;

            width: calc(100% - 40px);

            max-width: 620px;

            margin: 40px auto 50px;

            min-height: auto;
          }

          .register-left-image {
            opacity: 0.25;
          }

          .register-right-image {
            opacity: 0.25;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {
          .register-page {
            min-height: 100vh;

            overflow-y: auto;
          }

          .register-header {
            width: calc(100% - 30px);

            margin: 0 auto;

            padding-top: 20px;

            gap: 10px;
          }

          .register-icon {
            width: 60px;
            height: 58px;

            flex-shrink: 0;
          }

          .register-icon svg {
            width: 42px;
            height: 42px;
          }

          .register-title {
            font-size: 21px;
            line-height: 25px;
          }

          .register-subtitle {
            font-size: 12px;
            line-height: 16px;
          }

          .register-card {
            width: calc(100% - 30px);

            margin: 30px auto 40px;

            padding: 20px;

            border-radius: 10px;
          }

          .form-row {
            grid-template-columns: 1fr;

            row-gap: 18px;

            margin-bottom: 18px;
          }

          .form-input {
            height: 40px;
          }

          .form-label {
            font-size: 14px;
          }

          .email-group {
            margin-bottom: 18px;
          }

          .terms-row {
            align-items: flex-start;

            margin-bottom: 20px;
          }

          .terms-checkbox {
            flex-shrink: 0;
            margin-top: 1px;
          }

          .terms-text {
            font-size: 11px;
          }

          .create-button {
            height: 40px;
          }

          .register-left-image {
            width: 70px;
            height: 280px;

            opacity: 0.2;
          }

          .register-right-image {
            width: 90px;
            height: 140px;

            opacity: 0.2;
          }
        }
      `}</style>

      <div className="register-page">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="register-header">

          <div className="register-icon">

            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >

              {/* Person */}

              <circle
                cx="27"
                cy="21"
                r="9"
                stroke="#0645E5"
                strokeWidth="3"
              />

              <path
                d="M12 50C12 40.6 18.7 34 27 34C35.3 34 42 40.6 42 50"
                stroke="#0645E5"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Plus */}

              <circle
                cx="47"
                cy="42"
                r="10"
                fill="#0645E5"
              />

              <path
                d="M47 37V47"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d="M42 42H52"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

            </svg>

          </div>

          <div className="register-heading">

            <h1 className="register-title">
              Create{" "}
              <span className="register-title-blue">
                Account
              </span>
            </h1>

            <p className="register-subtitle">
              Join CollabBoard and start managing projects with your team.
            </p>

          </div>

        </div>


        {/* =========================================
            LEFT DECORATION
        ========================================= */}

        <img
          src={leftImage}
          alt=""
          className="register-left-image"
        />


        {/* =========================================
            RIGHT DECORATION
        ========================================= */}

        <img
          src={rightImage}
          alt=""
          className="register-right-image"
        />


        {/* =========================================
            REGISTER FORM
        ========================================= */}

        <div className="register-card">

          {/* FULL NAME + USERNAME */}

          <div className="form-row">

            {/* FULL NAME */}

            <div className="form-group">

              <label className="form-label">
                Full Name
              </label>

              <div className="input-wrapper">

                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                >

                  <circle
                    cx="12"
                    cy="8"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M5 20C5.8 16.7 8.1 15 12 15C15.9 15 18.2 16.7 19 20"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />

                </svg>

                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>


            {/* USERNAME */}

            <div className="form-group">

              <label className="form-label">
                Username
              </label>

              <div className="input-wrapper">

                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                >

                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M9 15C9.8 15.7 11 16 12 16C14.2 16 16 14.5 16 12.5C16 10.5 14.5 9 12.5 9C10.7 9 9.5 10.2 9.5 11.7C9.5 13.1 10.5 14 12 14C13.5 14 14.5 13 14.5 11.8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />

                </svg>

                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>

          </div>


          {/* EMAIL */}

          <div className="form-group email-group">

            <label className="form-label">
              Email Address
            </label>

            <div className="input-wrapper">

              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="none"
              >

                <rect
                  x="4"
                  y="6"
                  width="16"
                  height="12"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <path
                  d="M5 8L12 13L19 8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

              <input
                type="email"
                className="form-input"
                placeholder="Enter your email address"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
              />

            </div>

          </div>


          {/* PASSWORD + CONFIRM PASSWORD */}

          <div className="form-row">

            {/* PASSWORD */}

            <div className="form-group">

              <label className="form-label">
                Password
              </label>

              <div className="input-wrapper">

                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                >

                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                </svg>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                  >

                    <path
                      d="M2 12C4.5 7.5 8 5 12 5C16 5 19.5 7.5 22 12C19.5 16.5 16 19 12 19C8 19 4.5 16.5 2 12Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                  </svg>

                </button>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label className="form-label">
                Confirm Password
              </label>

              <div className="input-wrapper">

                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                >

                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                </svg>

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  className="form-input"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setError("");
                  }}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                  >

                    <path
                      d="M2 12C4.5 7.5 8 5 12 5C16 5 19.5 7.5 22 12C19.5 16.5 16 19 12 19C8 19 4.5 16.5 2 12Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                  </svg>

                </button>

              </div>

            </div>

          </div>


          {/* TERMS */}

          <div className="terms-row">

            <input
              type="checkbox"
              className="terms-checkbox"
            />

            <span className="terms-text">

              I agree to the{" "}

              <a
                href="#"
                className="terms-link"
              >
                Terms of Service
              </a>

              {" "}and{" "}

              <a
                href="#"
                className="terms-link"
              >
                Privacy Policy
              </a>

            </span>

          </div>


          {/* CREATE ACCOUNT BUTTON */}

          {error && <p className="register-error">{error}</p>}

          <button
            type="button"
            className="create-button"
            onClick={handleCreateAccount}
          >

            <svg
              viewBox="0 0 24 24"
              fill="none"
            >

              <circle
                cx="9"
                cy="8"
                r="3"
                stroke="white"
                strokeWidth="1.5"
              />

              <path
                d="M3 20C3.7 16.7 5.7 15 9 15C12.3 15 14.3 16.7 15 20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                d="M18 13V19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                d="M15 16H21"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

            </svg>

            Create Account

          </button>

        </div>

      </div>
    </>
  );
}

export default RegisterPage;
