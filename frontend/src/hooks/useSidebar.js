// src/hooks/useSidebar.js
import { useState, useEffect } from 'react';

export const useSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Check localStorage for saved sidebar state, default to true for desktop
    const saved = localStorage.getItem('sidebarOpen');
    if (saved !== null) return JSON.parse(saved);
    return window.innerWidth > 1024;
  });

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  // Toggle sidebar handler
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar on mobile when navigation link is clicked
  const handleNavClick = () => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

  return {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    handleNavClick
  };
};
