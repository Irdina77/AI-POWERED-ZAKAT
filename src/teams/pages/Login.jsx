import React, { useState } from "react";
import "../Styles/Login.css";
import zakatIcon from "../assets/zakat-icon.webp";

function Login({ onLoginSuccess, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      setMessage("❌ Please enter a valid email address");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const isAdmin = normalizedEmail === "admin@gmail.com";
    const adminPassword = "123456";

    if (isAdmin) {
      if (password !== adminPassword) {
        setMessage("❌ Invalid credentials");
        return;
      }
    } else {
      const matchedUser = storedUsers.find((user) => user.email === normalizedEmail);

      if (!matchedUser) {
        setMessage("❌ Account not found. Please register first.");
        return;
      }

      if (matchedUser.password !== password) {
        setMessage("❌ Invalid credentials");
        return;
      }
    }

    setIsLoading(true);
    setMessage("");

    setTimeout(() => {
      setIsLoading(false);
      const role = isAdmin ? "admin" : "user";
      setMessage("✅ Login successful!");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", normalizedEmail);
      localStorage.setItem("userRole", role);
      onLoginSuccess(role);
    }, 700);
  };

  return (
    <div className="glass-page-container">
      <div className="glass-card">

        <h1 className="title-with-icon">
          <img src={zakatIcon} alt="zakat icon" className="icon-small" />
          <span>ZakatNow</span>
        </h1>

        <p className="subtitle">Welcome back! Please sign in</p>

        {message && <div className="message error">{message}</div>}

        <form onSubmit={handleLogin}>
          <div className="floating-group">
            <input 
              id="email" 
              type="email" 
              placeholder=" " 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              disabled={isLoading}
              required 
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="floating-group">
            <input 
              id="password" 
              type="password" 
              placeholder=" " 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              disabled={isLoading}
              required 
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn-glass-gold" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="auth-link">
          Don't have an account? <span onClick={onGoToRegister}>Register here</span>
        </div>
      </div>
    </div>
  );
}

export default Login;