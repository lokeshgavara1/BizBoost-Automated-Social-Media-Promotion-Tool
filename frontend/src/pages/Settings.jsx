import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiUser, FiMail, FiCalendar, FiShield, FiBell, 
  FiSettings, FiCheck, FiX, FiEdit3, FiSave,
  FiLock, FiEye, FiEyeOff, FiAlertCircle, FiActivity
} from 'react-icons/fi';
import axios from '../api/axios';
import '../styles/Settings.css';

export default function Settings() {
  const { user: authUser, setUser: setAuthUser, darkMode, setDarkMode } = useAuth();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  
  // Password change
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  // Active tab
  const [activeTab, setActiveTab] = useState('profile'); // profile, security, notifications

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/user/me');
        setUser(res.data.user);
        const fullName = res.data.user.name || 'Gavara Lokesh';
        const nameParts = fullName.split(' ');
        setFirstName(nameParts[0] || 'Gavara');
        setLastName(nameParts.slice(1).join(' ') || 'Lokesh');
        setDisplayName(fullName);
        setJobTitle(res.data.user.jobTitle || '');
        setEmail(res.data.user.email || 'lokeshgavara1@gmail.com');
        
        // Set preferences
        if (res.data.user.preferences) {
          setEmailNotifications(res.data.user.preferences.emailNotifications ?? true);
          setPushNotifications(res.data.user.preferences.pushNotifications ?? false);
        }
        
        // Check if user is OAuth user (can't change password)
        setShowPasswordSection(!res.data.user.isGoogleUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Set default values if API fails
        setUser({ name: 'Gavara Lokesh', email: 'lokeshgavara1@gmail.com' });
        setFirstName('Gavara');
        setLastName('Lokesh');
        setDisplayName('Gavara Lokesh');
        setEmail('lokeshgavara1@gmail.com');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    setStatus('');
    setSaving(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await axios.patch('/user/me', { 
        name: fullName,
        displayName,
        jobTitle
      });
      
      // Update auth context
      if (authUser) {
        setAuthUser({ ...authUser, name: fullName });
      }
      
      setStatus('Profile updated successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Save error:', error);
      setStatus('Error saving profile');
      setTimeout(() => setStatus(''), 3000);
    } finally {
      setSaving(false);
    }
  };
  
  const savePreferences = async () => {
    setStatus('');
    setSaving(true);
    try {
      await axios.patch('/user/me', {
        preferences: {
          emailNotifications,
          pushNotifications,
          darkMode
        }
      });
      setStatus('Preferences updated successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Save preferences error:', error);
      setStatus('Error saving preferences');
      setTimeout(() => setStatus(''), 3000);
    } finally {
      setSaving(false);
    }
  };
  
  const changePassword = async () => {
    setPasswordError('');
    setStatus('');
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All password fields are required');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    setSaving(true);
    try {
      await axios.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      setStatus('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Change password error:', error);
      setPasswordError(error.response?.data?.error || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      {/* Sidebar Toggle Button */}
      <button 
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <svg className="logo-icon" viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="logo">BizBoost</h1>
          </div>
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">G</div>
          <div className="user-info">
            <div className="user-name">{displayName || 'Gavara Lokesh'}</div>
            <div className="user-email">{email || 'lokeshgavara1@gmail.com'}</div>
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
          <Link to="/settings" className="nav-item active">
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
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="page-header">
          <h1>Profile Settings</h1>
          <p>Manage your account information and preferences</p>
        </div>

        {status && (
          <div className={`status-message ${status.includes('Error') || status.includes('Failed') ? 'error' : 'success'}`}>
            <FiCheck className="status-icon" />
            {status}
          </div>
        )}

        {passwordError && (
          <div className="status-message error">
            <FiAlertCircle className="status-icon" />
            {passwordError}
          </div>
        )}

        {/* Settings Tabs */}
        <div className="settings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser /> Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FiBell /> Notifications
          </button>
          {showPasswordSection && (
            <button 
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <FiShield /> Security
            </button>
          )}
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <FiActivity /> Activity
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-layout">
              {/* Left Column */}
              <div className="profile-left">
                {/* User Profile Card */}
                <div className="profile-card">
                  <div className="profile-avatar-container">
                    <div className="profile-avatar">{firstName.charAt(0) || 'G'}</div>
                    <button className="avatar-edit-btn">
                      <FiEdit3 />
                    </button>
                  </div>
                  <h2 className="profile-name">{displayName || 'Gavara Lokesh'}</h2>
                  <div className="status-badge approved">APPROVED</div>
                  <div className="profile-info">
                    <div className="info-item">
                      <FiMail />
                      <span>{email || 'lokeshgavara1@gmail.com'}</span>
                    </div>
                    <div className="info-item">
                      <FiCalendar />
                      <span>Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'October 18, 2025'}</span>
                    </div>
                    <div className="info-item">
                      <FiShield />
                      <span>Email Verified</span>
                    </div>
                  </div>
                </div>

                {/* Dark Mode Toggle Card */}
                <div className="quick-actions-card">
                  <div className="card-header">
                    <FiSettings />
                    <h3>Appearance</h3>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Dark Mode</span>
                      <span className="toggle-description">Enable dark theme</span>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="profile-right">
                {/* Personal Information Card */}
                <div className="info-card">
                  <div className="card-header">
                    <div className="header-left">
                      <FiUser />
                      <h3>Personal Information</h3>
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>First Name</label>
                      <input 
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Display Name</label>
                      <input 
                        type="text" 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter display name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Job Title</label>
                      <input 
                        type="text" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Enter job title"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        readOnly
                        placeholder="Email address"
                      />
                      <small>Email cannot be changed. Contact support if you need to update your email.</small>
                    </div>
                  </div>
                </div>

                {/* Account Information Card */}
                <div className="info-card">
                  <div className="card-header">
                    <div className="header-left">
                      <FiShield />
                      <h3>Account Information</h3>
                    </div>
                  </div>
                  <div className="account-info">
                    <div className="info-row">
                      <span className="label">Account Status</span>
                      <span className="value approved">Active</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Email Verification</span>
                      <span className="value verified">Verified</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Member Since</span>
                      <span className="value">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'October 18, 2025'}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Account Type</span>
                      <span className="value">{user?.isGoogleUser ? 'Google OAuth' : 'Email & Password'}</span>
                    </div>
                  </div>
                </div>

                <div className="profile-actions">
                  <button onClick={save} className="save-btn" disabled={saving}>
                    {saving ? 'Saving...' : (<><FiSave /> Save Changes</>)}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="notifications-layout">
              <div className="info-card">
                <div className="card-header">
                  <div className="header-left">
                    <FiBell />
                    <h3>Notification Preferences</h3>
                  </div>
                </div>
                <div className="notification-settings">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Email Notifications</span>
                      <span className="toggle-description">Receive updates and alerts via email</span>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Push Notifications</span>
                      <span className="toggle-description">Get push notifications for important updates</span>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={pushNotifications}
                        onChange={(e) => setPushNotifications(e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                <div className="profile-actions">
                  <button onClick={savePreferences} className="save-btn" disabled={saving}>
                    {saving ? 'Saving...' : (<><FiSave /> Save Preferences</>)}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && showPasswordSection && (
            <div className="security-layout">
              <div className="info-card">
                <div className="card-header">
                  <div className="header-left">
                    <FiLock />
                    <h3>Change Password</h3>
                  </div>
                </div>
                <div className="password-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <div className="password-input">
                      <input 
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                      <button 
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <div className="password-input">
                      <input 
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password (min 6 characters)"
                      />
                      <button 
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <div className="password-input">
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                      <button 
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="profile-actions">
                  <button onClick={changePassword} className="save-btn" disabled={saving}>
                    {saving ? 'Changing...' : (<><FiLock /> Change Password</>)}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="activity-layout">
              <div className="info-card">
                <div className="card-header">
                  <div className="header-left">
                    <FiActivity />
                    <h3>Recent Activity</h3>
                  </div>
                </div>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon logged-in">
                      <FiCheck />
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">Logged in</div>
                      <div className="activity-time">Today at 2:30 PM</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon updated">
                      <FiEdit3 />
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">Profile updated</div>
                      <div className="activity-time">Yesterday at 5:45 PM</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon connected">
                      <FiShield />
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">Account created</div>
                      <div className="activity-time">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'October 18, 2025'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}