import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Recommendations.css';

const Recommendations = () => {
  const [selectedTab, setSelectedTab] = useState('content');

  const recommendations = {
    content: [
      {
        id: 1,
        title: "Optimize Your Posting Times",
        description: "Based on your audience data, posting between 7-9 PM on weekdays shows 23% higher engagement.",
        type: "timing",
        priority: "high",
        impact: "+23% engagement"
      },
      {
        id: 2,
        title: "Increase Video Content",
        description: "Your video posts generate 3x more engagement than static images. Consider creating more video content.",
        type: "content",
        priority: "medium",
        impact: "+200% engagement"
      },
      {
        id: 3,
        title: "Use Trending Hashtags",
        description: "Include #DigitalMarketing and #BusinessGrowth in your posts to reach a broader audience.",
        type: "hashtags",
        priority: "low",
        impact: "+15% reach"
      }
    ],
    engagement: [
      {
        id: 4,
        title: "Respond to Comments Faster",
        description: "Quick responses to comments increase engagement rates by 40% on average.",
        type: "engagement",
        priority: "high",
        impact: "+40% engagement"
      },
      {
        id: 5,
        title: "Ask Questions in Posts",
        description: "Posts with questions receive 50% more comments than regular posts.",
        type: "content",
        priority: "medium",
        impact: "+50% comments"
      }
    ],
    growth: [
      {
        id: 6,
        title: "Collaborate with Influencers",
        description: "Partner with micro-influencers in your niche to reach new audiences.",
        type: "growth",
        priority: "high",
        impact: "+35% followers"
      },
      {
        id: 7,
        title: "Cross-Platform Promotion",
        description: "Promote your Instagram content on other platforms to drive traffic.",
        type: "growth",
        priority: "medium",
        impact: "+25% cross-platform traffic"
      }
    ]
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'timing':
        return (
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'content':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'hashtags':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'engagement':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'growth':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <div className="recommendations-page">
      {/* Sidebar */}
      <aside className="sidebar">
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
          <Link to="/recommendations" className="nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Recommendations
          </Link>
          <Link to="/connections" className="nav-item">
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
      <main className="main-content">
        <div className="page-header">
          <h1>AI Recommendations</h1>
          <p>Personalized insights and suggestions to boost your social media performance</p>
        </div>

        {/* Performance Overview Card */}
        <div className="performance-overview-card">
          <h2>Performance Overview</h2>
          <div className="performance-metrics">
            <div className="metric-item">
              <div className="metric-label">Engagement Rate</div>
              <div className="metric-value">
                <span className="current">6.1%</span>
                <span className="target">/ 8.0%</span>
              </div>
              <div className="metric-bar">
                <div className="metric-progress" style={{ width: '76%' }}></div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Posting Frequency</div>
              <div className="metric-value">
                <span className="current">2%</span>
                <span className="target">/ 5%</span>
              </div>
              <div className="metric-bar">
                <div className="metric-progress" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Click-Through Rate</div>
              <div className="metric-value">
                <span className="current">5.86%</span>
                <span className="target">/ 2.5%</span>
              </div>
              <div className="metric-bar">
                <div className="metric-progress" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="recommendations-container">
          <div className="tabs-container">
            <button 
              className={`tab ${selectedTab === 'recommendations' ? 'active' : ''}`}
              onClick={() => setSelectedTab('recommendations')}
            >
              Recommendations
            </button>
            <button 
              className={`tab ${selectedTab === 'platforms' ? 'active' : ''}`}
              onClick={() => setSelectedTab('platforms')}
            >
              Platforms
            </button>
            <button 
              className={`tab ${selectedTab === 'content' ? 'active' : ''}`}
              onClick={() => setSelectedTab('content')}
            >
              Content Ideas
            </button>
            <button 
              className={`tab ${selectedTab === 'insights' ? 'active' : ''}`}
              onClick={() => setSelectedTab('insights')}
            >
              Insights
            </button>
          </div>

          <div className="recommendations-grid">
            <div className="recommendation-card high-impact">
              <div className="card-header">
                <div className="card-icon educational">
                  <svg viewBox="0 0 24 24">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div className="card-badges">
                  <span className="badge high-impact">High Impact</span>
                  <span className="badge medium-effort">Medium Effort</span>
                </div>
              </div>
              <div className="card-content">
                <h3>Create Educational Content</h3>
                <p>Share tutorials, tips, and how-to guides to establish thought leadership and drive engagement.</p>
                <div className="card-impact">
                  <span className="impact-value">+45% engagement</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn btn-primary">
                  Implement Recommendation
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="recommendation-card high-impact">
              <div className="card-header">
                <div className="card-icon timing">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="card-badges">
                  <span className="badge high-impact">High Impact</span>
                  <span className="badge low-effort">Low Effort</span>
                </div>
              </div>
              <div className="card-content">
                <h3>Optimize Posting Times</h3>
                <p>Schedule posts during peak engagement hours (7-9 PM) to maximize reach and visibility.</p>
                <div className="card-impact">
                  <span className="impact-value">+30% reach</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn btn-primary">
                  Implement Recommendation
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="recommendation-card high-impact">
              <div className="card-header">
                <div className="card-icon visual">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                    <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="card-badges">
                  <span className="badge high-impact">High Impact</span>
                  <span className="badge medium-effort">Medium Effort</span>
                </div>
              </div>
              <div className="card-content">
                <h3>Increase Visual Content</h3>
                <p>Add more images, videos, and infographics to your content mix for better engagement.</p>
                <div className="card-impact">
                  <span className="impact-value">+60% impressions</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn btn-primary">
                  Implement Recommendation
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="recommendation-card medium-impact">
              <div className="card-header">
                <div className="card-icon engagement">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M13 8H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 12H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="card-badges">
                  <span className="badge medium-impact">Medium Impact</span>
                  <span className="badge high-effort">High Effort</span>
                </div>
              </div>
              <div className="card-content">
                <h3>Engage with Your Audience</h3>
                <p>Respond to comments, ask questions, and start conversations to build community.</p>
                <div className="card-impact">
                  <span className="impact-value">+25% engagement</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn btn-primary">
                  Implement Recommendation
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recommendations;
