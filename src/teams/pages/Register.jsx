import React, { useState } from "react";
import "../Styles/Register.css";
import zakatIcon from "../assets/zakat-icon.webp";

function Register({ onRegisterSuccess, onBackToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    // Check if all fields are filled
    if (!username.trim()) {
      setMessage("⚠️ Please enter your full name");
      return false;
    }

    if (!email.trim()) {
      setMessage("⚠️ Please enter your email address");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setMessage("❌ Please enter a valid email address");
      return false;
    }

    if (!password) {
      setMessage("⚠️ Please enter a password");
      return false;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const getStoredUsers = () => {
    const stored = localStorage.getItem("registeredUsers");
    return stored ? JSON.parse(stored) : [];
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();

    if (users.some((user) => user.email === normalizedEmail)) {
      setMessage("⚠️ An account with this email already exists");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newUser = {
        username: username.trim(),
        email: normalizedEmail,
        password,
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

      setIsLoading(false);
      setMessage("✅ Account created successfully! Redirecting to login...");

      // Clear form fields
      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        onRegisterSuccess();
      }, 1500);
    }, 800);
  };

  return (
    <div className="glass-page-container">
      <div className="glass-card">

        <h1 className="title-with-icon">
          <img src={zakatIcon} alt="zakat icon" className="icon-small" />
          <span>ZakatNow</span>
        </h1>

        <p className="subtitle">Join our community. Create your account</p>

        {message && (
          <p className={`message ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleCreateAccount}>
          <div className="floating-group">
            <input 
              id="user" 
              type="text" 
              placeholder=" " 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              disabled={isLoading}
              required 
            />
            <label htmlFor="user">Full Name</label>
          </div>

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
              id="pass" 
              type="password" 
              placeholder=" " 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              disabled={isLoading}
              required 
            />
            <label htmlFor="pass">Password</label>
          </div>

          <button 
            type="submit" 
            className="btn-glass-gold" 
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <span onClick={onBackToLogin}>Sign in here</span>
        </div>
      </div>
    </div>
  );
}

export default Register;