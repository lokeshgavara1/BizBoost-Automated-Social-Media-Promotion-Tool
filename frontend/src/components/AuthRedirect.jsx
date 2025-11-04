import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

const AuthRedirect = () => {
  const { user, loading } = useAuth();

  console.log('AuthRedirect - Loading:', loading);
  console.log('AuthRedirect - User:', user);

  // Show loading spinner while checking authentication
  if (loading) {
    console.log('AuthRedirect - Showing loading state');
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        <div>
          <div style={{ marginBottom: '10px' }}>Loading...</div>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
      </div>
    );
  }

  // If user is authenticated, show dashboard
  if (user) {
    console.log('AuthRedirect - User authenticated, showing dashboard');
    return <Dashboard />;
  }

  // If user is not authenticated, redirect to login
  console.log('AuthRedirect - User not authenticated, redirecting to login');
  return <Navigate to="/login" replace />;
};

export default AuthRedirect;
