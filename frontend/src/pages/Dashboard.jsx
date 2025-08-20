// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SocialConnections from '../components/SocialConnections';
import AIContentGenerator from '../components/AIContentGenerator';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [connectedUsername, setConnectedUsername] = useState('');

  useEffect(() => {
    // Check for social media connection success messages
    const instagramConnected = searchParams.get('instagram_connected');
    const facebookConnected = searchParams.get('facebook_connected');
    const linkedinConnected = searchParams.get('linkedin_connected');
    const username = searchParams.get('username');
    const platform = searchParams.get('platform') || 'Social Media';
    
    if ((instagramConnected === 'true' || facebookConnected === 'true' || linkedinConnected === 'true') && username) {
      setShowSuccessMessage(true);
      setConnectedUsername(username);
      
      // Clear URL parameters
      navigate('/', { replace: true });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        setConnectedUsername('');
      }, 5000);
    }
  }, [searchParams, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <Link to="/" className="logo">BizBoost</Link>
          <nav className="nav-menu">
            <Link to="/" className="nav-link active">Dashboard</Link>
            <Link to="/business-profile" className="nav-link">Business Profile</Link>
            <Link to="/campaigns" className="nav-link">Campaigns</Link>
            <Link to="/analytics" className="nav-link">Analytics</Link>
            <Link to="/settings" className="nav-link">Settings</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="dashboard-main">
        {showSuccessMessage && (
          <div className="success-message">
            <div className="success-content">
              <span className="success-icon">✓</span>
              <div className="success-text">
                <h4>Social Media Connected Successfully!</h4>
                <p>Your account @{connectedUsername} is now connected to BizBoost.</p>
              </div>
            </div>
          </div>
        )}

        <section className="welcome-section">
          <h1 className="welcome-title">Welcome to BizBoost Dashboard</h1>
          <p className="welcome-subtitle">
            Your automated social media promotion tool is ready to boost your business!
          </p>
        </section>

        <SocialConnections />

        <section className="ai-content-section">
          <h3>AI Content Generation</h3>
          <AIContentGenerator />
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon posts">📝</div>
            <div className="stat-number">24</div>
            <div className="stat-label">Posts Created</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon engagement">💬</div>
            <div className="stat-number">1,247</div>
            <div className="stat-label">Total Engagement</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon reach">👥</div>
            <div className="stat-number">45.2K</div>
            <div className="stat-label">Total Reach</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon growth">📈</div>
            <div className="stat-number">+23%</div>
            <div className="stat-label">Growth Rate</div>
          </div>
        </section>

        <section className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn">
              <span>📝</span>
              Create New Post
            </button>
            
            <button className="action-btn secondary">
              <span>📊</span>
              View Analytics
            </button>
            
            <button className="action-btn success">
              <span>⚡</span>
              Schedule Campaign
            </button>
            
            <Link to="/business-profile" className="action-btn primary">
              <span>🏢</span>
              Manage Business Profile
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
