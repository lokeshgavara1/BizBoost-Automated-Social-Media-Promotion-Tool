import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function Onboarding() {
  const startGoogle = () => { window.location.href = `${axios.defaults.baseURL}/auth/google`; };
  const startFacebook = () => { window.location.href = `${axios.defaults.baseURL}/auth/facebook`; };
  const startInstagram = () => { window.location.href = `${axios.defaults.baseURL}/auth/instagram`; };
  const startLinkedIn = () => { window.location.href = `${axios.defaults.baseURL}/auth/linkedin`; };

  return (
    <div style={{ padding: 24 }}>
      <h1>Connect your social accounts</h1>
      <p>Link platforms to publish and analyze posts from one place.</p>
      <div style={{ display: 'grid', gap: 12, maxWidth: 420, marginTop: 16 }}>
        <button className="btn btn--primary" onClick={startGoogle}>Connect Google</button>
        <button className="btn" onClick={startFacebook}>Connect Facebook</button>
        <button className="btn" onClick={startInstagram}>Connect Instagram</button>
        <button className="btn" onClick={startLinkedIn}>Connect LinkedIn</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Link to="/dashboard" className="btn btn--ghost">Skip for now</Link>
      </div>
    </div>
  );
}
