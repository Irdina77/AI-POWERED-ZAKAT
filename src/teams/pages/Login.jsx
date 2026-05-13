import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useLanguage } from "../context/LanguageContext";
import { getTranslationSection } from "../translations/translations";
import "../Styles/Login.css";
import zakatIcon from "../assets/zakat-icon.webp";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslationSection(language, 'login');

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage(`⚠️ ${t.allFieldsRequired}`);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      setMessage(`✅ ${t.loginSuccessful}`);
      onLoginSuccess("user");
    } catch (error) {
      setMessage(`❌ ${t.invalidCredentials}`);
      console.error("Firebase sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-page-container">
      <div className="glass-card">

        <h1 className="title-with-icon">
          <img
            src={zakatIcon}
            alt="zakat icon"
            className="icon-small"
          />
          <span>ZakatNow</span>
        </h1>

        <p className="subtitle">
          {t.welcomeBack}
        </p>

        {message && (
          <p
            className={`message ${
              message.includes("✅")
                ? "success"
                : "error"
            }`}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleLogin}
        >
          <div className="floating-group">
            <input
              id="email"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              disabled={isLoading}
              required
            />
            <label htmlFor="email">
              {t.email}
            </label>
          </div>

          <div className="floating-group">
            <input
              id="password"
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              disabled={isLoading}
              required
            />
            <label htmlFor="password">
              {t.password}
            </label>
          </div>

          <button
            type="submit"
            className="btn-glass-gold"
            disabled={isLoading}
          >
            {isLoading
              ? "Signing In..."
              : t.signIn}
          </button>
        </form>

        <div className="auth-link">
          {t.dontHaveAccount}{" "}
          <span
            onClick={() =>
              navigate(
                "/register"
              )
            }
          >
            {t.register}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;