import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');

    console.log('GoogleAuthCallback - Token:', token ? 'present' : 'missing');
    console.log('GoogleAuthCallback - User param:', userParam ? 'present' : 'missing');

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        console.log('GoogleAuthCallback - Parsed user:', user);
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        console.log('GoogleAuthCallback - Token stored in localStorage');
        
        // Update auth context
        loginWithGoogle(token, user);
        console.log('GoogleAuthCallback - Auth context updated');
        
        // Set loading to false and redirecting to true
        setLoading(false);
        setRedirecting(true);
        
        // Redirect to home page after successful auth
        console.log('GoogleAuthCallback - Redirecting to home...');
        navigate('/home', { replace: true });
        
      } catch (err) {
        console.error('GoogleAuthCallback - Error parsing user data:', err);
        setError('Failed to parse user data');
        setLoading(false);
      }
    } else {
      console.error('GoogleAuthCallback - Missing token or user data');
      setError('Missing authentication data');
      setLoading(false);
    }
  }, [searchParams, loginWithGoogle, navigate]);

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Authenticating...</h2>
          <div className="loading-spinner"></div>
          <p>Please wait while we complete your Google sign-in.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Authentication Error</h2>
          <p className="error-message">{error}</p>
          <button 
            className="auth-button"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (redirecting) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Success!</h2>
          <div className="loading-spinner"></div>
          <p>Taking you to the homepage...</p>
        </div>
      </div>
    );
  }

  // This should rarely be reached, but just in case
  return null;
};

export default GoogleAuthCallback;
