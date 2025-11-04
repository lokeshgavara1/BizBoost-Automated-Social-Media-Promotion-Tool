import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { useSidebar } from '../hooks/useSidebar';
import Skeleton from '../components/Skeleton';
import '../styles/Analytics.css';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const { sidebarOpen, toggleSidebar, handleNavClick } = useSidebar();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/analytics');
        setData(res.data);
      } catch (e) {
        setError(e.response?.data?.error || 'Failed to load analytics');
      }
    })();
  }, []);

  if (!data) return <div style={{ padding: 24 }}><Skeleton lines={6} /></div>;

  const { totalPosts, totalEngagement, totalReach, engagementRate, topPosts, recommendations } = data;

  return (
    <div className="analytics-page">
      <DashboardSidebar 
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onNavClick={handleNavClick}
      />

      {/* Main Content */}
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="page-header">
          <div className="section-label">INSIGHTS</div>
          <h1 className="page-title">
            Analytics <span className="title-accent">Dashboard</span>
          </h1>
          <p className="page-subtitle">Track your social media performance and insights</p>
        </div>

        <div className="analytics-content">
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card">
              <h3>Total Posts</h3>
              <div className="stat-number">{totalPosts || 0}</div>
            </div>
            <div className="summary-card">
              <h3>Total Engagement</h3>
              <div className="stat-number">{totalEngagement || 0}</div>
            </div>
            <div className="summary-card">
              <h3>Total Reach</h3>
              <div className="stat-number">{totalReach || 0}</div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="metrics-section">
            <div className="section-label">PERFORMANCE</div>
            <h2 className="section-title-small">
              Key <span className="title-accent">Metrics</span>
            </h2>
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="label">Engagement Rate</div>
                <div className="value">{engagementRate || 0}%</div>
              </div>
              <div className="metric-item">
                <div className="label">Total Reach</div>
                <div className="value">{totalReach || 0}</div>
              </div>
              <div className="metric-item">
                <div className="label">Total Clicks</div>
                <div className="value">4,381</div>
              </div>
              <div className="metric-item">
                <div className="label">Total Shares</div>
                <div className="value">1,234</div>
              </div>
            </div>
            <div className="chart-placeholder">
              <div className="chart-line"></div>
              <div className="chart-area"></div>
              <span>Performance Chart</span>
            </div>
          </div>

          {/* Top Performing Posts */}
          <div className="top-posts-section">
            <div className="section-label">TOP CONTENT</div>
            <h2 className="section-title-small">
              Top Performing <span className="title-accent">Posts</span>
            </h2>
            <div className="posts-list">
              {topPosts && topPosts.map(post => (
                <div key={post._id} className="post-item">
                  <div className="post-content">
                    <div className="post-platforms">{(post.platforms || []).join(', ')}</div>
                    <div className="post-caption">{post.caption || '(no caption)'}</div>
                  </div>
                  <div className="post-date">{new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Reports */}
          <div className="export-section">
            <h2>Export Reports</h2>
            <div className="export-buttons">
              <button className="btn btn-primary" onClick={() => alert('PDF export (stub)')}>
                Export PDF
              </button>
              <button className="btn btn-secondary" onClick={() => alert('CSV export (stub)')}>
                Export CSV
              </button>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="recommendations-section">
            <div className="section-label">SUGGESTIONS</div>
            <h2 className="section-title-small">
              AI <span className="title-accent">Recommendations</span>
            </h2>
            <div className="recommendations-list">
              {recommendations && recommendations.map((rec, index) => (
                <div key={index} className="recommendation-item">
                  • {rec}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
