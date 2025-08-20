import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../styles/SocialConnect.css';

const FacebookConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/auth/facebook/status');
      setIsConnected(response.data.connected);
      setUsername(response.data.username || '');
    } catch (error) {
      console.error('Error checking Facebook connection:', error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const connectFacebook = async () => {
    try {
      setConnecting(true);
      setError('');
      
      // Navigate to backend Facebook OAuth endpoint
      const redirectTo = `${axios.defaults.baseURL}/auth/facebook`;
      window.location.href = redirectTo;
    } catch (error) {
      console.error('Error connecting Facebook:', error);
      setError('Failed to connect Facebook account');
      setConnecting(false);
    }
  };

  const disconnectFacebook = async () => {
    try {
      setConnecting(true);
      setError('');
      
      await axios.delete('/auth/facebook/disconnect');
      setIsConnected(false);
      setUsername('');
    } catch (error) {
      console.error('Error disconnecting Facebook:', error);
      setError('Failed to disconnect Facebook account');
    } finally {
      setConnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="social-connect-card facebook">
        <div className="loading-spinner"></div>
        <p>Checking Facebook connection...</p>
      </div>
    );
  }

  return (
    <div className="social-connect-card facebook">
      <div className="social-header">
        <div className="social-icon facebook-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
        <div className="social-info">
          <h3>Facebook</h3>
          <p>Connect your Facebook page for business promotion</p>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {isConnected ? (
        <div className="connected-state">
          <div className="connection-info">
            <p className="connected-text">
              <span className="status-indicator connected"></span>
              Connected
            </p>
            <p className="username">{username}</p>
          </div>
          <button 
            className="disconnect-button"
            onClick={disconnectFacebook}
            disabled={connecting}
          >
            {connecting ? 'Disconnecting...' : 'Disconnect'}
          </button>
        </div>
      ) : (
        <div className="disconnected-state">
          <p className="disconnected-text">
            <span className="status-indicator disconnected"></span>
            Not connected
          </p>
          <button 
            className="connect-button facebook-btn"
            onClick={connectFacebook}
            disabled={connecting}
          >
            {connecting ? 'Connecting...' : 'Connect Facebook'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FacebookConnect;
