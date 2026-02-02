import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Our custom hook

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registration_no, setRegistration_no] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(email, password, name, registration_no);
      navigate('/'); // Redirect to the main app
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Floating decorative shapes */}
      <div className="auth-floating-shape"></div>
      <div className="auth-floating-shape"></div>
      <div className="auth-floating-shape"></div>
      
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon">👤</div>
          <h2 className="auth-title">Join ReaDefy</h2>
          <p className="auth-subtitle">Create your account and start learning smarter</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="auth-form">
          {/* Full Name Input */}
          <div className="auth-input-group">
            <label htmlFor="name" className="auth-label">Full Name</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">👤</span>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nahid Gazi"
                required
                className="auth-input"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="auth-input-group">
            <label htmlFor="email" className="auth-label">Email Address</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">✉️</span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="auth-input"
              />
            </div>
          </div>

          {/* Registration Number Input */}
          <div className="auth-input-group">
            <label htmlFor="registration_no" className="auth-label">Registration Number</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">🎓</span>
              <input
                id="registration_no"
                type="text"
                value={registration_no}
                onChange={(e) => setRegistration_no(e.target.value)}
                placeholder="2022331xxx"
                required
                className="auth-input"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="auth-input-group">
            <label htmlFor="password" className="auth-label">Password</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">🔒</span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
                className="auth-input"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="auth-error">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="auth-button auth-button-signup">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Log In</Link>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;