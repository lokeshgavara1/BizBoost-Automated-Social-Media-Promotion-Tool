// src/components/DashboardSidebar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardSidebar = ({ sidebarOpen, toggleSidebar, onNavClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button 
        className={`sidebar-toggle ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        title={sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {sidebarOpen ? (
            // Close icon (X)
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            // Menu icon (hamburger)
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h1 className="logo">BizBoost</h1>
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'Gavara Lokesh'}</div>
            <div className="user-email">{user?.email || 'lokeshgavara1@gmail.com'}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/home" className={`nav-item ${isActive('/home')}`} onClick={onNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Home
          </Link>
          <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`} onClick={onNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            Dashboard
          </Link>
          <Link to="/create" className={`nav-item ${isActive('/create')}`} onClick={onNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Content
          </Link>
          <Link to="/calendar" className={`nav-item ${isActive('/calendar')}`} onClick={onNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            Schedule
          </Link>
          <Link to="/analytics" className={`nav-item ${isActive('/analytics')}`} onClick={onNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
            </svg>
            Analytics
          </Link>
          <Link to="/recommendations" className={`nav-item ${isActive('/recommendations')}`} onClick={onNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Recommendations
          </Link>
          <Link to="/connections" className={`nav-item ${isActive('/connections')}`} onClick={onNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H16.5c-.83 0-1.54.5-1.84 1.22L14.5 12.5H17v10h3zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9.5L7 8.5A1.5 1.5 0 0 0 5.5 7H3.5c-.83 0-1.54.5-1.84 1.22L1.5 12.5H4v10h3.5z"/>
            </svg>
            Connections
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/settings" className={`nav-item ${isActive('/settings')}`} onClick={onNavClick}>
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Profile
          </Link>
          <button onClick={handleLogout} className="nav-item logout-btn">
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
