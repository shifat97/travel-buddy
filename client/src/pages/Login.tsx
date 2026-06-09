import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import '../styles/auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div className="auth-container" data-test="login-container">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            <LogIn className="auth-icon" />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Login to your account to continue</p>
        </div>

        {error && (
          <div className="auth-error" data-test="login-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" data-test="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-test="login-email-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label className="form-label" htmlFor="password">Password</label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-test="login-password-input"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block" 
            disabled={isLoading}
            data-test="login-submit-btn"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                <span>Logging in...</span>
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register" data-test="register-link">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
