import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import '../styles/Connections.css';

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [connectingPlatform, setConnectingPlatform] = useState(null);
  const [disconnectingPlatform, setDisconnectingPlatform] = useState(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    setLoading(true);
    setError('');
    try {
      // Default state - all accounts disconnected to encourage connection
      const defaultConnections = [
        {
          id: 1,
          platform: 'facebook',
          name: 'Facebook Page',
          username: 'Connect your Facebook page',
          status: 'disconnected',
          lastSync: null,
          followers: 0,
          posts: 0
        },
        {
          id: 2,
          platform: 'instagram',
          name: 'Instagram Business',
          username: 'Connect your Instagram account',
          status: 'disconnected',
          lastSync: null,
          followers: 0,
          posts: 0
        },
        {
          id: 3,
          platform: 'linkedin',
          name: 'LinkedIn Company',
          username: 'Connect your LinkedIn page',
          status: 'disconnected',
          lastSync: null,
          followers: 0,
          posts: 0
        },
        {
          id: 4,
          platform: 'twitter',
          name: 'Twitter Account',
          username: 'Connect your Twitter account',
          status: 'disconnected',
          lastSync: null,
          followers: 0,
          posts: 0
        }
      ];
      setConnections(defaultConnections);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch connections.');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (platform) => {
    try {
      setConnectingPlatform(platform);
      setSuccessMessage(`Connecting to ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`);
      
      // Simulate connection delay for better UX
      setTimeout(() => {
        // Update the connection status to connected
        setConnections(prev => prev.map(conn => 
          conn.platform === platform 
            ? { 
                ...conn, 
                status: 'connected',
                username: `@your${platform}account`,
                lastSync: new Date().toISOString(),
                followers: Math.floor(Math.random() * 10000),
                posts: Math.floor(Math.random() * 100)
              }
            : conn
        ));
        
        setSuccessMessage(`Successfully connected to ${platform.charAt(0).toUpperCase() + platform.slice(1)}! 🎉`);
        setConnectingPlatform(null);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      }, 1500);
      
      // Note: In production, this should redirect to OAuth:
      // window.location.href = `/api/auth/${platform}`;
    } catch (err) {
      setError('Failed to initiate connection.');
      setConnectingPlatform(null);
    }
  };

  const handleDisconnect = async (connectionId, platform) => {
    try {
      setDisconnectingPlatform(platform);
      setError(''); // Clear any previous errors
      
      // Show disconnecting message
      setSuccessMessage(`Disconnecting from ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`);
      
      // Simulate disconnect delay for better UX
      setTimeout(() => {
        // Update the connection status to disconnected
        setConnections(prev => prev.map(conn => 
          conn.id === connectionId 
            ? { 
                ...conn, 
                status: 'disconnected',
                username: `Connect your ${platform} account`,
                lastSync: null,
                followers: 0,
                posts: 0
              }
            : conn
        ));
        
        setSuccessMessage(`Successfully disconnected from ${platform.charAt(0).toUpperCase() + platform.slice(1)}! ✓`);
        setDisconnectingPlatform(null);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      }, 1000);
      
      // Note: In production, this should call the API:
      // await axios.delete(`/connections/${connectionId}`);
    } catch (err) {
      setError(`Failed to disconnect from ${platform}. Please try again.`);
      setDisconnectingPlatform(null);
      console.error('Disconnect error:', err);
    }
  };

  const handleSync = async (connectionId) => {
    try {
      // API call to sync data
      await axios.post(`/connections/${connectionId}/sync`);
      fetchConnections(); // Refresh data
    } catch (err) {
      setError('Failed to sync account data.');
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'facebook':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="currentColor"/>
            <rect x="2" y="9" width="4" height="12" fill="currentColor"/>
            <circle cx="4" cy="4" r="2" fill="currentColor"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" fill="currentColor"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'facebook': return '#1877f2';
      case 'instagram': return '#e4405f';
      case 'linkedin': return '#0a66c2';
      case 'twitter': return '#1da1f2';
      default: return '#6b7280';
    }
  };

  const formatLastSync = (lastSync) => {
    if (!lastSync) return 'Never';
    const date = new Date(lastSync);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="connections-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading connections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="connections-page">
      {/* Sidebar Toggle Button */}
      <button 
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? (
          <svg viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h1 className="logo">BizBoost</h1>
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">G</div>
          <div className="user-info">
            <div className="user-name">Gavara Lokesh</div>
            <div className="user-email">lokeshgavara1@gmail.com</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/home" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            Home
          </Link>
          <Link to="/dashboard" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
            Dashboard
          </Link>
          <Link to="/create" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            Content
          </Link>
          <Link to="/calendar" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
            Schedule
          </Link>
          <Link to="/analytics" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>
            Analytics
          </Link>
          <Link to="/recommendations" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Recommendations
          </Link>
          <Link to="/connections" className="nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H16.5c-.83 0-1.54.5-1.84 1.22L14.5 12.5H17v10h3zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9.5L7 8.5A1.5 1.5 0 0 0 5.5 7H3.5c-.83 0-1.54.5-1.84 1.22L1.5 12.5H4v10h3.5z"/></svg>
            Connections
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/settings" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            Profile
          </Link>
          <button onClick={() => { /* handle logout */ }} className="nav-item logout-btn">
            <svg className="nav-icon" viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

              {/* Main Content */}
              <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="page-header">
                  <h1>Connect Your Social Media</h1>
                  <p>Get started by connecting your social media accounts to unlock the full power of BizBoost</p>
                </div>

                {/* Success Message */}
                {successMessage && (
                  <div className="success-message">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="currentColor"/>
                    </svg>
                    {successMessage}
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="error-message">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" fill="currentColor"/>
                    </svg>
                    {error}
                  </div>
                )}

                {/* Welcome Section */}
                <div className="welcome-section">
                  <div className="welcome-content">
                    <div className="welcome-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H16.5c-.83 0-1.54.5-1.84 1.22L14.5 12.5H17v10h3zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9.5L7 8.5A1.5 1.5 0 0 0 5.5 7H3.5c-.83 0-1.54.5-1.84 1.22L1.5 12.5H4v10h3.5z"/>
                      </svg>
                    </div>
                    <div className="welcome-text">
                      <h2>Welcome to BizBoost!</h2>
                      <p>Connect your social media accounts to start creating, scheduling, and analyzing your content with AI-powered tools.</p>
                      <div className="welcome-benefits">
                        <div className="benefit">
                          <svg viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span>AI-powered content generation</span>
                        </div>
                        <div className="benefit">
                          <svg viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span>Smart scheduling across platforms</span>
                        </div>
                        <div className="benefit">
                          <svg viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span>Comprehensive analytics & insights</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="connections-section">
                  <h2>Available Platforms</h2>
                  <p>Choose which social media platforms you'd like to connect to BizBoost</p>
                </div>

                <div className="connections-grid">
          {connections.map((connection) => (
            <div key={connection.id} className="connection-card">
              <div className="card-header">
                <div className="platform-info">
                  <div 
                    className="platform-icon" 
                    style={{ color: getPlatformColor(connection.platform) }}
                  >
                    {getPlatformIcon(connection.platform)}
                  </div>
                  <div className="platform-details">
                    <h3>{connection.name}</h3>
                    <span className="username">{connection.username}</span>
                  </div>
                </div>
                <div className={`status-badge ${connection.status}`}>
                  {connection.status === 'connected' ? 'Connected' : 'Disconnected'}
                </div>
              </div>

                      {connection.status === 'connected' ? (
                        <div className="connection-stats">
                          <div className="stat">
                            <span className="stat-value">{connection.followers.toLocaleString()}</span>
                            <span className="stat-label">Followers</span>
                          </div>
                          <div className="stat">
                            <span className="stat-value">{connection.posts}</span>
                            <span className="stat-label">Posts</span>
                          </div>
                          <div className="stat">
                            <span className="stat-value">{formatLastSync(connection.lastSync)}</span>
                            <span className="stat-label">Last Sync</span>
                          </div>
                        </div>
                      ) : (
                        <div className="connection-description">
                          <p>Connect your {connection.platform} account to start managing your content and analytics.</p>
                        </div>
                      )}

              <div className="card-actions">
                {connection.status === 'connected' ? (
                  <>
                    <button 
                      onClick={() => handleSync(connection.id)}
                      className="btn btn-secondary"
                      disabled={disconnectingPlatform === connection.platform}
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                      </svg>
                      Sync
                    </button>
                    <button 
                      onClick={() => handleDisconnect(connection.id, connection.platform)}
                      className="btn btn-danger"
                      disabled={disconnectingPlatform === connection.platform}
                    >
                      {disconnectingPlatform === connection.platform ? (
                        <>
                          <div className="loading-spinner-small"></div>
                          Disconnecting...
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24">
                            <path d="M18 8h1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-1v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2H5a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h1V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2z"/>
                          </svg>
                          Disconnect
                        </>
                      )}
                    </button>
                  </>
                        ) : (
                          <button 
                            onClick={() => handleConnect(connection.platform)}
                            className="btn btn-primary btn-large"
                            disabled={connectingPlatform === connection.platform}
                          >
                            {connectingPlatform === connection.platform ? (
                              <>
                                <div className="loading-spinner-small"></div>
                                Connecting...
                              </>
                            ) : (
                              <>
                                <svg viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                                </svg>
                                Connect {connection.platform.charAt(0).toUpperCase() + connection.platform.slice(1)}
                              </>
                            )}
                          </button>
                        )}
              </div>
            </div>
          ))}
        </div>

        <div className="connection-help">
          <div className="help-card">
            <div className="help-icon">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="help-content">
              <h3>Need Help?</h3>
              <p>Having trouble connecting your accounts? Check our help documentation or contact support for assistance.</p>
              <div className="help-actions">
                <button className="btn btn-secondary">View Documentation</button>
                <button className="btn btn-secondary">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Connections;
