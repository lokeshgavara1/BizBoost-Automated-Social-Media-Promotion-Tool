// src/pages/Calendar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import '../styles/Calendar.css';

const Calendar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [platformFilter, setPlatformFilter] = useState('all');

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/posts?status=scheduled');
      setPosts(response.data.posts || []);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError('Failed to load scheduled posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calendar navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  // Get posts for a specific date
  const getPostsForDate = (date) => {
    if (!posts || posts.length === 0) return [];
    
    return posts.filter(post => {
      if (!post.scheduledAt) return false;
      const postDate = new Date(post.scheduledAt);
      return postDate.toDateString() === date.toDateString();
    }).filter(post => {
      if (platformFilter === 'all') return true;
      return post.platforms && post.platforms.includes(platformFilter);
    });
  };

  // Generate calendar days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(year, month - 1, day);
      days.push({
        day,
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        postCount: getPostsForDate(date).length
      });
    }
    
    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        day,
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
        postCount: getPostsForDate(date).length
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        day,
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        postCount: getPostsForDate(date).length
      });
    }
    
    return days;
  };

  // Delete post
  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this scheduled post?')) return;
    
    try {
      await axios.delete(`/posts/${postId}`);
      await fetchPosts();
    } catch (err) {
      console.error('Failed to delete post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  // Reschedule post
  const handleReschedulePost = async (postId, newDate) => {
    try {
      await axios.patch(`/posts/${postId}/reschedule`, {
        scheduledAt: newDate.toISOString()
      });
      await fetchPosts();
    } catch (err) {
      console.error('Failed to reschedule post:', err);
      alert('Failed to reschedule post. Please try again.');
    }
  };

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get month name
  const getMonthYear = () => {
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  // Get week dates
  const getWeekDates = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    startOfWeek.setDate(diff);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  // Calculate stats
  const totalScheduled = posts.length;
  const thisWeekPosts = posts.filter(post => {
    if (!post.scheduledAt) return false;
    const postDate = new Date(post.scheduledAt);
    const weekDates = getWeekDates();
    return postDate >= weekDates[0] && postDate <= weekDates[6];
  }).length;

  const selectedDayPosts = getPostsForDate(selectedDate);

  return (
    <div className="calendar-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">BizBoost</h1>
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">G</div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'Gavara Lokesh'}</div>
            <div className="user-email">{user?.email || 'lokeshgavara1@gmail.com'}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Home
          </Link>
          <Link to="/dashboard" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            Dashboard
          </Link>
          <Link to="/create" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Content
          </Link>
          <Link to="/calendar" className="nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            Schedule
          </Link>
          <Link to="/analytics" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
            </svg>
            Analytics
          </Link>
          <Link to="/recommendations" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Recommendations
          </Link>
          <Link to="/connections" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H16.5c-.83 0-1.54.5-1.84 1.22L14.5 12.5H17v10h3zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9.5L7 8.5A1.5 1.5 0 0 0 5.5 7H3.5c-.83 0-1.54.5-1.84 1.22L1.5 12.5H4v10h3.5z"/>
            </svg>
            Connections
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/settings" className="nav-item">
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

      {/* Main Content */}
      <main className="main-content">
        <div className="content-header">
          <div>
            <h1>Content Scheduler</h1>
            <p>Plan and schedule your social media posts for optimal engagement</p>
          </div>
          <div className="header-actions">
            <button onClick={goToToday} className="today-btn">
              Today
            </button>
            <select 
              value={platformFilter} 
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="platform-filter"
            >
              <option value="all">All Platforms</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
            {error}
          </div>
        )}

        <div className="content-grid">
          {/* Calendar Widget */}
          <div className="calendar-widget">
            <div className="widget-header">
              <svg className="widget-icon" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              <h3>Calendar</h3>
            </div>
            
            <div className="calendar-navigation">
              <button onClick={goToPreviousMonth} className="nav-arrow" aria-label="Previous month">‹</button>
              <span className="month-year">{getMonthYear()}</span>
              <button onClick={goToNextMonth} className="nav-arrow" aria-label="Next month">›</button>
            </div>

            <div className="calendar-days-header">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            <div className="calendar-grid">
              {loading ? (
                <div className="calendar-loading">Loading...</div>
              ) : (
                getCalendarDays().map((day, index) => (
                  <button
                    key={index}
                    className={`calendar-day 
                      ${!day.isCurrentMonth ? 'other-month' : ''} 
                      ${day.isToday ? 'today' : ''}
                      ${day.isSelected ? 'selected' : ''}
                      ${day.postCount > 0 ? 'has-posts' : ''}
                    `}
                    onClick={() => day.isCurrentMonth && handleDateSelect(day.day)}
                    disabled={!day.isCurrentMonth}
                  >
                    <span className="day-number">{day.day}</span>
                    {day.postCount > 0 && (
                      <span className="post-indicator">{day.postCount}</span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Quick Stats Widget */}
          <div className="stats-widget">
            <div className="widget-header">
              <h3>Quick Stats</h3>
            </div>
            <div className="stats-list">
              <div className="stat-item">
                <span>Total Scheduled</span>
                <span className="stat-badge scheduled">{totalScheduled}</span>
              </div>
              <div className="stat-item">
                <span>This Week</span>
                <span className="stat-badge this-week">{thisWeekPosts}</span>
              </div>
              <div className="stat-item">
                <span>Selected Day</span>
                <span className="stat-badge selected-day">{selectedDayPosts.length}</span>
              </div>
            </div>
          </div>

          {/* Week View Widget */}
          <div className="week-widget">
            <div className="widget-header">
              <h3>This Week</h3>
            </div>
            <div className="week-days">
              {getWeekDates().map((date, index) => {
                const postsCount = getPostsForDate(date).length;
                const isSelected = date.toDateString() === selectedDate.toDateString();
                return (
                  <button
                    key={index}
                    className={`day-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <span className="day-name">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="day-number">{date.getDate()}</span>
                    {postsCount > 0 && (
                      <span className="day-posts-count">{postsCount} post{postsCount !== 1 ? 's' : ''}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Schedule Widget */}
          <div className="daily-widget">
            <div className="widget-header">
              <h3>{formatDate(selectedDate)}</h3>
              <button 
                onClick={() => navigate('/create')} 
                className="schedule-post-btn"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Schedule Post
              </button>
            </div>
            
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading posts...</p>
              </div>
            ) : selectedDayPosts.length === 0 ? (
              <div className="empty-schedule">
                <svg className="empty-icon" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                <p>No posts scheduled for this day</p>
                <button onClick={() => navigate('/create')} className="create-post-link">
                  Create your first post
                </button>
              </div>
            ) : (
              <div className="posts-timeline">
                {selectedDayPosts
                  .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
                  .map(post => (
                    <div key={post._id} className="post-item">
                      <div className="post-time">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" fill="currentColor"/>
                        </svg>
                        {formatTime(post.scheduledAt)}
                      </div>
                      <div className="post-content">
                        <div className="post-platforms">
                          {post.platforms && post.platforms.map(platform => (
                            <span key={platform} className="platform-badge">
                              {platform}
                            </span>
                          ))}
                        </div>
                        <p className="post-caption">
                          {post.caption || post.description || 'No caption'}
                        </p>
                        {post.hashtags && (
                          <p className="post-hashtags">{post.hashtags}</p>
                        )}
                      </div>
                      <div className="post-actions">
                        <button 
                          onClick={() => navigate(`/create?edit=${post._id}`)}
                          className="action-btn edit-btn"
                          title="Edit post"
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post._id)}
                          className="action-btn delete-btn"
                          title="Delete post"
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;