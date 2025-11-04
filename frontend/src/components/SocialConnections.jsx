import React from 'react';
import FacebookConnect from './FacebookConnect';
import InstagramConnect from './InstagramConnect';
import LinkedInConnect from './LinkedInConnect';
import '../styles/SocialConnections.css';

const SocialConnections = () => {
  return (
    <section className="social-connections-section">
      <div className="section-header">
        <h2>Social Media Connections</h2>
        <p>Connect your social media accounts to automate your business promotion across all platforms</p>
      </div>
      
      <div className="connections-grid">
        <FacebookConnect />
        <InstagramConnect />
        <LinkedInConnect />
      </div>
      
      <div className="connections-info">
        <div className="info-card">
          <div className="info-icon">🔗</div>
          <div className="info-content">
            <h4>Secure Connections</h4>
            <p>All connections use OAuth 2.0 for secure authentication. We never store your passwords.</p>
          </div>
        </div>
        
        <div className="info-card">
          <div className="info-icon">⚡</div>
          <div className="info-content">
            <h4>Auto-Posting</h4>
            <p>Schedule and automatically post content to all your connected social media platforms.</p>
          </div>
        </div>
        
        <div className="info-card">
          <div className="info-icon">📊</div>
          <div className="info-content">
            <h4>Analytics</h4>
            <p>Track engagement, reach, and performance across all your social media accounts.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialConnections;
