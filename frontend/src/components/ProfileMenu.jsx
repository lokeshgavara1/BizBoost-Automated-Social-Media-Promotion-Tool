import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { logout, darkMode, setDarkMode } = useAuth();
  const navigate = useNavigate();

  const doLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(v => !v)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#cfe1ff', borderRadius: 10, padding: '6px 10px' }}>👤</button>
      {open && (
        <div style={{ position: 'absolute', right: 0, marginTop: 8, background: 'rgba(8,11,22,0.98)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: 8, display: 'grid', gap: 6 }}>
          <button onClick={() => setDarkMode(!darkMode)} className="btn btn--ghost">{darkMode ? 'Light mode' : 'Dark mode'}</button>
          <button onClick={() => navigate('/settings')} className="btn btn--ghost">Settings</button>
          <button onClick={doLogout} className="btn">Logout</button>
        </div>
      )}
    </div>
  );
}
