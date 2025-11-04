import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import '../styles/Campaigns.css';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', startDate: '', endDate: '', platforms: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.get('/campaigns');
      setCampaigns(res.data.campaigns || []);
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    try {
      setError('');
      await axios.post('/campaigns', form);
      setForm({ name: '', description: '', startDate: '', endDate: '', platforms: [] });
      setShowCreate(false);
      await load();
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to create campaign');
    }
  };

  const togglePlatform = (p) => {
    setForm(prev => ({
      ...prev,
      platforms: prev.platforms.includes(p) 
        ? prev.platforms.filter(x => x !== p)
        : [...prev.platforms, p]
    }));
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/campaigns/${id}`, { status });
      await load();
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to update campaign');
    }
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="campaigns-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="campaigns-page">
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
          <Link to="/recommendations" className="nav-item">
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
          <button onClick={handleLogout} className="nav-item logout-btn">
            <svg className="nav-icon" viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="page-header">
          <div className="header-content">
            <div>
              <div className="section-label">CAMPAIGNS</div>
              <h1 className="page-title">
                Campaign <span className="title-accent">Management</span>
              </h1>
              <p className="page-subtitle">Create and manage your social media campaigns</p>
            </div>
            <button onClick={() => setShowCreate(true)} className="btn btn-primary">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
              Create Campaign
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="campaigns-content">
          {/* Create Campaign Modal */}
          {showCreate && (
            <div className="create-campaign-modal">
              <div className="modal-overlay" onClick={() => setShowCreate(false)}></div>
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Create New Campaign</h2>
                  <button onClick={() => setShowCreate(false)} className="close-btn">
                    <svg viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="campaign-name">Campaign Name</label>
                    <input
                      id="campaign-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g., Summer Sale 2024"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="campaign-description">Description</label>
                    <textarea
                      id="campaign-description"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      placeholder="Describe your campaign goals and strategy..."
                      className="form-textarea"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="start-date">Start Date</label>
                      <input
                        id="start-date"
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="end-date">End Date</label>
                      <input
                        id="end-date"
                        type="date"
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Platforms</label>
                    <div className="platform-selector">
                      {['Instagram', 'Facebook', 'LinkedIn', 'Twitter'].map(platform => (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => togglePlatform(platform)}
                          className={`platform-btn ${form.platforms.includes(platform) ? 'selected' : ''}`}
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button onClick={() => setShowCreate(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button onClick={create} className="btn btn-primary">
                    Create Campaign
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Campaigns List */}
          <div className="campaigns-list">
            {campaigns.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>No campaigns yet</h3>
                <p>Create your first campaign to start organizing your social media content.</p>
                <button onClick={() => setShowCreate(true)} className="btn btn-primary">
                  Create Campaign
                </button>
              </div>
            ) : (
              campaigns.map(campaign => (
                <div key={campaign._id} className="campaign-card">
                  <div className="campaign-header">
                    <div className="campaign-info">
                      <h3>{campaign.name}</h3>
                      <p>{campaign.description}</p>
                    </div>
                    <div className="campaign-status">
                      <select 
                        value={campaign.status} 
                        onChange={(e) => updateStatus(campaign._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="campaign-details">
                    <div className="detail-item">
                      <span className="detail-label">Platforms:</span>
                      <span className="detail-value">{(campaign.platforms || []).join(', ')}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Posts:</span>
                      <span className="detail-value">{campaign.metrics?.totalPosts || 0}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className={`status-badge status-${campaign.status}`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="campaign-actions">
                    <button className="btn btn-secondary">
                      <svg viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                      Edit
                    </button>
                    <button className="btn btn-secondary">
                      <svg viewBox="0 0 24 24">
                        <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
                      </svg>
                      Analytics
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
