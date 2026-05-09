import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import zakatIcon from "../assets/zakat-icon.webp";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage(
        "⚠️ Please fill in all fields"
      );
      return;
    }

    setIsLoading(true);
    setMessage("");

    setTimeout(() => {
      const normalizedEmail =
        email.trim().toLowerCase();

      // ===================
      // ADMIN LOGIN
      // ===================
      if (
        normalizedEmail ===
          "admin@gmail.com" &&
        password === "123456"
      ) {
        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "userEmail",
          normalizedEmail
        );

        localStorage.setItem(
          "userRole",
          "admin"
        );

        setIsLoading(false);
        setMessage(
          "✅ Login successful!"
        );

        onLoginSuccess("admin");
        return;
      }

      // ===================
      // REGISTERED USERS
      // ===================
      const storedUsers =
        JSON.parse(
          localStorage.getItem(
            "registeredUsers"
          ) || "[]"
        );

      const matchedUser =
        storedUsers.find(
          (user) =>
            user.email ===
              normalizedEmail &&
            user.password ===
              password
        );

      if (matchedUser) {
        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "userEmail",
          normalizedEmail
        );

        localStorage.setItem(
          "userRole",
          "user"
        );

        setIsLoading(false);
        setMessage(
          "✅ Login successful!"
        );

        onLoginSuccess("user");
      } else {
        setIsLoading(false);

        setMessage(
          "❌ Invalid email or password"
        );
      }
    }, 700);
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
          Welcome back! Please sign in
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
              Email Address
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
              Password
            </label>
          </div>

          <button
            type="submit"
            className="btn-glass-gold"
            disabled={isLoading}
          >
            {isLoading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

        <div className="auth-link">
          Don't have an account?{" "}
          <span
            onClick={() =>
              navigate(
                "/register"
              )
            }
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;