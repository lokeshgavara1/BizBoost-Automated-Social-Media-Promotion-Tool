import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import "../styles/Auth.css";

const Register = () => {
  const { register, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/home', { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Loading...
      </div>
    );
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    
    try {
      await register(name, email, password);
      navigate("/home", { replace: true });
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setGoogleLoading(true);
    
    try {
      const redirectTo = `${axios.defaults.baseURL}/auth/google`;
      window.location.href = redirectTo;
    } catch (err) {
      setError("Failed to initiate Google sign-up. Please try again.");
      setGoogleLoading(false);
    }
  };

  const handleFacebookSignUp = async () => {
    setError("");
    setFacebookLoading(true);
    
    try {
      const redirectTo = `${axios.defaults.baseURL}/auth/facebook`;
      window.location.href = redirectTo;
    } catch (err) {
      setError("Failed to initiate Facebook sign-up. Please try again.");
      setFacebookLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="logo">
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1>BizBoost</h1>
          </div>
          <h2>Create your account</h2>
          <p>Start your journey with BizBoost today</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" fill="currentColor"/>
            </svg>
            {error}
          </div>
        )}

        {/* Social Signup Buttons */}
        <div className="social-buttons">
          <button 
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
            className="social-btn google-btn"
          >
            {googleLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            Continue with Google
          </button>

          <button 
            onClick={handleFacebookSignUp}
            disabled={facebookLoading || loading}
            className="social-btn facebook-btn"
          >
            {facebookLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
              </svg>
            )}
            Continue with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="divider">
          <span>or</span>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span className="checkmark"></span>
              I agree to the 
              <Link to="/terms" className="terms-link"> Terms of Service</Link> 
              and 
              <Link to="/privacy" className="terms-link"> Privacy Policy</Link>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading || googleLoading || facebookLoading}
            className="auth-btn primary-btn"
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            Already have an account? 
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;