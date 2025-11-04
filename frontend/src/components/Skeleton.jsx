import React from 'react';

export default function Skeleton({ lines = 3 }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{ height: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 8 }} />
      ))}
    </div>
  );
}


