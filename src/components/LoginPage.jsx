import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Our custom hook
import { toast, ToastContainer } from 'react-toastify'; 
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/'); // Redirect to the main app after login
      toast.success("Successfully logged in!", {
        position: "top-center",
        autoClose: 2000,
      }); 
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
          <div className="auth-icon">🎓</div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="auth-form">
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
                placeholder="nahid8@gmail.com"
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
          <button type="submit" className="auth-button auth-button-login">
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
}
export default LoginPage;