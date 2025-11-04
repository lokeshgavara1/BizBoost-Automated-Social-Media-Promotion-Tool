import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const items = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/create', label: 'Create' },
    { to: '/calendar', label: 'Calendar' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/library', label: 'Library' }
  ];

  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(8,11,22,0.9)', backdropFilter: 'blur(6px)', display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, padding: '10px 8px', zIndex: 20 }}>
      {items.map(i => (
        <NavLink key={i.to} to={i.to} style={({ isActive }) => ({ color: isActive ? '#fff' : '#b6c3ff', textDecoration: 'none', textAlign: 'center', fontWeight: 700 })}>
          {i.label}
        </NavLink>
      ))}
    </nav>
  );
}
