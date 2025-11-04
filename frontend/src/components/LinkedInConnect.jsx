import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../styles/SocialConnect.css';

const LinkedInConnect = () => {
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
      const response = await axios.get('/auth/linkedin/status');
      setIsConnected(response.data.connected);
      setUsername(response.data.username || '');
    } catch (error) {
      console.error('Error checking LinkedIn connection:', error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const connectLinkedIn = async () => {
    try {
      setConnecting(true);
      setError('');
      
      // Navigate to backend LinkedIn OAuth endpoint
      const redirectTo = `${axios.defaults.baseURL}/auth/linkedin`;
      window.location.href = redirectTo;
    } catch (error) {
      console.error('Error connecting LinkedIn:', error);
      setError('Failed to connect LinkedIn account');
      setConnecting(false);
    }
  };

  const disconnectLinkedIn = async () => {
    try {
      setConnecting(true);
      setError('');
      
      await axios.delete('/auth/linkedin/disconnect');
      setIsConnected(false);
      setUsername('');
    } catch (error) {
      console.error('Error disconnecting LinkedIn:', error);
      setError('Failed to disconnect LinkedIn account');
    } finally {
      setConnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="social-connect-card linkedin">
        <div className="loading-spinner"></div>
        <p>Checking LinkedIn connection...</p>
      </div>
    );
  }

  return (
    <div className="social-connect-card linkedin">
      <div className="social-header">
        <div className="social-icon linkedin-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
        <div className="social-info">
          <h3>LinkedIn</h3>
          <p>Connect your LinkedIn profile for professional networking</p>
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
            onClick={disconnectLinkedIn}
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
            className="connect-button linkedin-btn"
            onClick={connectLinkedIn}
            disabled={connecting}
          >
            {connecting ? 'Connecting...' : 'Connect LinkedIn'}
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkedInConnect;
