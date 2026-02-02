import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <i className="bi bi-book-fill"></i>
            <h4>Welcome Back</h4>
            <p>Sign in to your account</p>
          </div>
          <div className="auth-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              <button
                className="btn btn-primary btn-auth w-100"
                type="submit"
                disabled={loading}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="auth-link">
                <small className="text-muted">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-decoration-none fw-medium">
                    Sign Up
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;