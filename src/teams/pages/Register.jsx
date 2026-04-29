import React, { useState } from "react";
import "../Styles/Register.css";
import zakatIcon from "../assets/zakat-icon.webp";

function Register({ onRegisterSuccess, onBackToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="glass-page-container">
      <div className="glass-card">

        <h1 className="title-with-icon">
          <img src={zakatIcon} alt="zakat icon" className="icon-small" />
          <span>ZakatNow</span>
        </h1>

        <p className="subtitle">Join our community. Create your account</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="floating-group">
            <input id="user" type="text" placeholder=" " value={username} onChange={(e) => setUsername(e.target.value)} required />
            <label htmlFor="user">Full Name</label>
          </div>

          <div className="floating-group">
            <input id="email" type="email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="floating-group">
            <input id="pass" type="password" placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor="pass">Password</label>
          </div>

          <button 
            type="submit" 
            className="btn-glass-gold" 
            onClick={onRegisterSuccess}
          >
            Create Account
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