import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import '../styles/Library.css';

export default function Library() {
  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [platform, setPlatform] = useState('');
  const [selected, setSelected] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.get('/posts', { params: { q, status, platform } });
      setPosts(res.data.posts || []);
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = (id) => setSelected(s => ({ ...s, [id]: !s[id] }));
  const allIds = posts.map(p => p._id);
  const selectAll = () => setSelected(Object.fromEntries(allIds.map(id => [id, true])));
  const clearSel = () => setSelected({});

  const bulkDelete = async () => {
    try {
      const ids = Object.entries(selected).filter(([, v]) => v).map(([k]) => k);
      if (!ids.length) return;
      await axios.post('/posts/bulk-delete', { ids });
      await load();
      clearSel();
    } catch (e) {
      alert(e.response?.data?.error || 'Failed to delete');
    }
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="library-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading content library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="library-page">
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
          <h1>Content Library</h1>
          <p>Manage and organize your content across all platforms</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="library-content">
          {/* Filters Section */}
          <div className="filters-section">
            <div className="filters-grid">
              <div className="filter-group">
                <label htmlFor="search">Search Content</label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search caption, description, hashtags..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="filter-input"
                />
              </div>
              <div className="filter-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="platform">Platform</label>
                <select
                  id="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Platforms</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter</option>
                </select>
              </div>
              <div className="filter-actions">
                <button onClick={load} className="btn btn-primary">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z"/>
                  </svg>
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="bulk-actions">
            <div className="bulk-info">
              <span>{Object.values(selected).filter(Boolean).length} selected</span>
            </div>
            <div className="bulk-buttons">
              <button onClick={selectAll} className="btn btn-secondary">
                Select All
              </button>
              <button onClick={clearSel} className="btn btn-secondary">
                Clear Selection
              </button>
              <button onClick={bulkDelete} className="btn btn-danger">
                <svg viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
                Delete Selected
              </button>
            </div>
          </div>

          {/* Content List */}
          <div className="content-list">
            {posts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </div>
                <h3>No content found</h3>
                <p>Start creating content or adjust your filters to see your posts.</p>
                <Link to="/create" className="btn btn-primary">
                  Create Content
                </Link>
              </div>
            ) : (
              posts.map(post => (
                <div key={post._id} className="content-item">
                  <div className="content-checkbox">
                    <input
                      type="checkbox"
                      checked={!!selected[post._id]}
                      onChange={() => toggle(post._id)}
                    />
                  </div>
                  <div className="content-info">
                    <div className="content-meta">
                      <span className="platforms">{(post.platforms || []).join(', ')}</span>
                      <span className="status-badge" data-status={post.status}>
                        {post.status}
                      </span>
                    </div>
                    <div className="content-text">
                      {post.caption || post.description || '(no caption)'}
                    </div>
                    {post.hashtags && (
                      <div className="content-hashtags">
                        {post.hashtags}
                      </div>
                    )}
                  </div>
                  <div className="content-date">
                    {new Date(post.createdAt).toLocaleDateString()}
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
