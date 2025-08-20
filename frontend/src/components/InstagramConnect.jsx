import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../styles/SocialConnect.css';

const InstagramConnect = () => {
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
      const response = await axios.get('/auth/instagram/status');
      setIsConnected(response.data.connected);
      setUsername(response.data.username || '');
    } catch (error) {
      console.error('Error checking social media connection:', error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const connectInstagram = async () => {
    try {
      setConnecting(true);
      setError('');
      
      // Navigate to backend social media OAuth endpoint
      const redirectTo = `${axios.defaults.baseURL}/auth/instagram`;
      window.location.href = redirectTo;
    } catch (error) {
      console.error('Error connecting social media:', error);
      setError('Failed to connect social media account');
      setConnecting(false);
    }
  };

  const disconnectInstagram = async () => {
    try {
      setConnecting(true);
      setError('');
      
      await axios.delete('/auth/instagram/disconnect');
      setIsConnected(false);
      setUsername('');
    } catch (error) {
      console.error('Error disconnecting social media:', error);
      setError('Failed to disconnect social media account');
    } finally {
      setConnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="social-connect-card instagram">
        <div className="loading-spinner"></div>
        <p>Checking Instagram connection...</p>
      </div>
    );
  }

  return (
    <div className="social-connect-card instagram">
      <div className="social-header">
        <div className="social-icon instagram-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
        <div className="social-info">
          <h3>Instagram</h3>
          <p>Connect your Instagram account for social media automation</p>
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
            <p className="username">@{username}</p>
          </div>
          <button 
            className="disconnect-button"
            onClick={disconnectInstagram}
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
            className="connect-button instagram-btn"
            onClick={connectInstagram}
            disabled={connecting}
          >
            {connecting ? 'Connecting...' : 'Connect Instagram'}
          </button>
        </div>
      )}
    </div>
  );
};

export default InstagramConnect;
