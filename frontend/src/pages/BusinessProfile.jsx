// src/pages/BusinessProfile.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BusinessProfileForm from '../components/BusinessProfileForm';
import '../styles/BusinessProfile.css';

const BusinessProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="business-profile-page">
      <header className="dashboard-header">
        <div className="header-content">
          <Link to="/" className="logo">BizBoost</Link>
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/business-profile" className="nav-link active">Business Profile</Link>
            <Link to="/campaigns" className="nav-link">Campaigns</Link>
            <Link to="/analytics" className="nav-link">Analytics</Link>
            <Link to="/settings" className="nav-link">Settings</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="business-profile-main">
        <div className="page-header">
          <h1>Business Profile</h1>
          <p>Create and manage your business profile to enhance your social media presence</p>
        </div>
        
        <BusinessProfileForm />
      </main>
    </div>
  );
};

export default BusinessProfile;
