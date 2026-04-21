import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const ResetPassword = () => {
  const [input, setInput] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (input) setSent(true);
  };

  return (
    <div className="auth-container">
      <div className="card">
        <Link to="/login" className="back-link">← Back</Link>
        <h2>Reset your Password</h2>
        <p className="subtitle">Enter your email and we'll send a verification code to reset your password.</p>
        {sent ? (
          <p style={{ color: '#0b7a3b', textAlign: 'center', marginTop: 20 }}>
            Verification code sent! Check your email.
          </p>
        ) : (
          <form onSubmit={handleSend}>
            <div className="input-group" style={{ marginTop: 16 }}>
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" value={input}
                onChange={(e) => setInput(e.target.value)} required />
            </div>
            <button className="btn-primary" type="submit">Send Verification Code</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
