import React, { useState } from "react";
import "../Styles/Login.css";
import zakatIcon from "../assets/zakat-icon.webp";

function Login({ onLoginSuccess, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "123456") {
      onLoginSuccess("admin");
    } else {
      setMessage("❌ Invalid credentials");
    }
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
              required 
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn-glass-gold">Sign In</button>
        </form>

        <div className="auth-link">
          Don't have an account? <span onClick={onGoToRegister}>Register here</span>
        </div>
      </div>
    </div>
  );
}

export default Login;