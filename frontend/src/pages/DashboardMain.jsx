// src/pages/DashboardMain.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardSidebar from '../components/DashboardSidebar';
import { useSidebar } from '../hooks/useSidebar';
import { 
  FiFileText, FiEye, FiMousePointer, FiHeart, 
  FiEdit3, FiCalendar, FiBarChart2, FiZap, 
  FiLink2, FiCheckCircle, FiXCircle, FiTrendingUp 
} from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from '../api/axios';
import '../styles/DashboardMain.css';

const DashboardMain = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [connectedUsername, setConnectedUsername] = useState('');
  const { sidebarOpen, toggleSidebar, handleNavClick } = useSidebar();
  
  // Dashboard data state
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    impressions: 0,
    clicks: 0,
    engagement: 0
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [platformConnections, setPlatformConnections] = useState({
    facebook: false,
    instagram: false,
    linkedin: false,
    twitter: false
  });
  const [goals, setGoals] = useState({
    postsCreated: { current: 7, target: 30 },
    impressions: { current: 74807, target: 50000 },
    engagement: { current: 6.1, target: 5.0 }
  });

  useEffect(() => {
    // Check for social media connection success messages
    const instagramConnected = searchParams.get('instagram_connected');
    const facebookConnected = searchParams.get('facebook_connected');
    const linkedinConnected = searchParams.get('linkedin_connected');
    const username = searchParams.get('username');
    
    if ((instagramConnected === 'true' || facebookConnected === 'true' || linkedinConnected === 'true') && username) {
      setShowSuccessMessage(true);
      setConnectedUsername(username);
      
      // Clear URL parameters
      navigate('/dashboard', { replace: true });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        setConnectedUsername('');
      }, 5000);
    }
  }, [searchParams, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch analytics data
        const analyticsRes = await axios.get('/analytics');
        const analyticsData = analyticsRes.data;
        
        // Fetch recent posts
        const postsRes = await axios.get('/posts?status=published');
        const postsData = postsRes.data.posts || [];
        
        // Calculate stats
        const totalPosts = analyticsData.summary?.totalPosts || 0;
        const impressions = analyticsData.metrics?.reach || 74807;
        const clicks = analyticsData.metrics?.clicks || 4381;
        const engagement = totalPosts > 0 ? ((clicks / impressions) * 100).toFixed(1) : 0;
        
        setStats({
          totalPosts,
          impressions,
          clicks,
          engagement
        });
        
        // Set recent posts (latest 5)
        setRecentPosts(postsData.slice(0, 5));
        
        // Generate performance data for chart
        const chartData = postsData.slice(0, 7).reverse().map((post, index) => ({
          name: `Post ${index + 1}`,
          impressions: Math.floor(Math.random() * 15000) + 5000,
          clicks: Math.floor(Math.random() * 1000) + 200
        }));
        setPerformanceData(chartData);
        
        // Check platform connections
        try {
          const instagramRes = await axios.get('/instagram/connection-status');
          setPlatformConnections(prev => ({ 
            ...prev, 
            instagram: instagramRes.data.connected || false 
          }));
        } catch (err) {
          console.log('Instagram not connected');
        }
        
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardSidebar 
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onNavClick={handleNavClick}
      />

      {/* Main Content */}
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {showSuccessMessage && (
          <div className="success-message">
            <div className="success-content">
              <span className="success-icon">✓</span>
              <div className="success-text">
                <h4>Social Media Connected Successfully!</h4>
                <p>Your account @{connectedUsername} is now connected to BizBoost.</p>
              </div>
            </div>
          </div>
        )}

        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'Gavara Lokesh'}!</h1>
          <p>Here's what's happening with your social media presence today.</p>
        </div>

        {/* Stats Cards - Horizontal Row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon-wrapper blue">
              <FiFileText className="stat-icon" />
            </div>
            <div className="stat-details">
              <div className="stat-value">{loading ? '...' : stats.totalPosts}</div>
              <div className="stat-label">Total Posts</div>
              <div className="stat-trend positive"><FiTrendingUp /> +12% vs last month</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper green">
              <FiEye className="stat-icon" />
            </div>
            <div className="stat-details">
              <div className="stat-value">{loading ? '...' : stats.impressions.toLocaleString()}</div>
              <div className="stat-label">Total Impressions</div>
              <div className="stat-trend positive"><FiTrendingUp /> +23% vs last month</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper purple">
              <FiMousePointer className="stat-icon" />
            </div>
            <div className="stat-details">
              <div className="stat-value">{loading ? '...' : stats.clicks.toLocaleString()}</div>
              <div className="stat-label">Total Clicks</div>
              <div className="stat-trend positive"><FiTrendingUp /> +8% vs last month</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper pink">
              <FiHeart className="stat-icon" />
            </div>
            <div className="stat-details">
              <div className="stat-value">{loading ? '...' : `${stats.engagement}%`}</div>
              <div className="stat-label">Avg. Engagement</div>
              <div className="stat-trend positive"><FiTrendingUp /> +5% vs last month</div>
            </div>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="dashboard-two-column">
          {/* Left: Performance Overview */}
          <div className="performance-section">
            <div className="section-heading">
              <h2>Performance Overview</h2>
              <FiBarChart2 className="heading-icon" />
            </div>
            <div className="chart-container">
              {loading ? (
                <div className="loading-chart">Loading chart data...</div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Line type="monotone" dataKey="impressions" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                    <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color green"></div>
                <span>Impressions</span>
              </div>
              <div className="legend-item">
                <div className="legend-color blue"></div>
                <span>Clicks</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="quick-actions-section">
            <div className="section-heading">
              <h2>Quick Actions</h2>
              <FiZap className="heading-icon" />
            </div>
            <div className="actions-list">
              <button className="action-item" onClick={() => navigate('/create')}>
                <div className="action-icon-wrapper blue">
                  <FiEdit3 />
                </div>
                <div className="action-content">
                  <h3>Create Content</h3>
                  <p>Generate AI-powered posts</p>
                </div>
              </button>

              <button className="action-item" onClick={() => navigate('/calendar')}>
                <div className="action-icon-wrapper green">
                  <FiCalendar />
                </div>
                <div className="action-content">
                  <h3>Schedule Posts</h3>
                  <p>Plan your content calendar</p>
                </div>
              </button>

              <button className="action-item" onClick={() => navigate('/analytics')}>
                <div className="action-icon-wrapper purple">
                  <FiBarChart2 />
                </div>
                <div className="action-content">
                  <h3>View Analytics</h3>
                  <p>Track performance metrics</p>
                </div>
              </button>

              <button className="action-item" onClick={() => navigate('/recommendations')}>
                <div className="action-icon-wrapper orange">
                  <FiZap />
                </div>
                <div className="action-content">
                  <h3>Get Recommendations</h3>
                  <p>AI-powered insights</p>
                </div>
              </button>

              <button className="action-item" onClick={() => navigate('/connections')}>
                <div className="action-icon-wrapper pink">
                  <FiLink2 />
                </div>
                <div className="action-content">
                  <h3>Manage Connections</h3>
                  <p>Connect social accounts</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Two Columns */}
        <div className="dashboard-two-column">
          {/* Left: Recent Posts */}
          <div className="recent-posts-section">
            <div className="section-heading">
              <h2>Recent Posts</h2>
              <button className="view-all-btn" onClick={() => navigate('/posts')}>View All</button>
            </div>
            <div className="posts-list">
              {loading ? (
                <div className="loading-posts">Loading posts...</div>
              ) : recentPosts.length > 0 ? (
                recentPosts.map((post, index) => (
                  <div key={post._id || index} className="post-item">
                    <div className="post-content">
                      <h4>{post.caption || 'Untitled Post'}</h4>
                      <p>{post.description ? post.description.substring(0, 80) + '...' : 'No description'}</p>
                      <div className="post-meta">
                        <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                        <div className="post-platforms">
                          {post.platforms && post.platforms.map(platform => (
                            <span key={platform} className={`platform-tag ${platform}`}>
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="post-stats">
                      <div className="post-stat">
                        <FiEye />
                        <span>{Math.floor(Math.random() * 5000) + 500}</span>
                      </div>
                      <div className="post-stat">
                        <FiMousePointer />
                        <span>{Math.floor(Math.random() * 500) + 50}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-posts">
                  <p>No posts yet. Create your first post!</p>
                  <button onClick={() => navigate('/create')} className="create-post-btn">
                    <FiEdit3 /> Create Post
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Goals & Platform Status */}
          <div className="sidebar-widgets">
            {/* Monthly Goals */}
            <div className="goals-widget">
              <div className="widget-header">
                <h3>Monthly Goals</h3>
              </div>
              <div className="goals-list">
                <div className="goal-item">
                  <div className="goal-header">
                    <span className="goal-label">Posts Created</span>
                    <span className="goal-value">{goals.postsCreated.current}/{goals.postsCreated.target}</span>
                  </div>
                  <div className="goal-progress">
                    <div 
                      className="goal-progress-bar" 
                      style={{ width: `${(goals.postsCreated.current / goals.postsCreated.target) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="goal-item">
                  <div className="goal-header">
                    <span className="goal-label">Impressions</span>
                    <span className="goal-value">{goals.impressions.current.toLocaleString()}/{goals.impressions.target.toLocaleString()}</span>
                  </div>
                  <div className="goal-progress">
                    <div 
                      className="goal-progress-bar exceeds" 
                      style={{ width: `${Math.min((goals.impressions.current / goals.impressions.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="goal-item">
                  <div className="goal-header">
                    <span className="goal-label">Engagement Rate</span>
                    <span className="goal-value">{goals.engagement.current}%/{goals.engagement.target}%</span>
                  </div>
                  <div className="goal-progress">
                    <div 
                      className="goal-progress-bar exceeds" 
                      style={{ width: `${Math.min((goals.engagement.current / goals.engagement.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Status */}
            <div className="platform-status-widget">
              <div className="widget-header">
                <h3>Platform Status</h3>
              </div>
              <div className="platforms-list">
                <div className="platform-item">
                  <div className="platform-info">
                    <div className="platform-name">Facebook</div>
                    <div className={`platform-status ${platformConnections.facebook ? 'connected' : 'disconnected'}`}>
                      {platformConnections.facebook ? (
                        <><FiCheckCircle /> Connected</>
                      ) : (
                        <><FiXCircle /> Disconnected</>
                      )}
                    </div>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-info">
                    <div className="platform-name">Instagram</div>
                    <div className={`platform-status ${platformConnections.instagram ? 'connected' : 'disconnected'}`}>
                      {platformConnections.instagram ? (
                        <><FiCheckCircle /> Connected</>
                      ) : (
                        <><FiXCircle /> Disconnected</>
                      )}
                    </div>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-info">
                    <div className="platform-name">LinkedIn</div>
                    <div className={`platform-status ${platformConnections.linkedin ? 'connected' : 'disconnected'}`}>
                      {platformConnections.linkedin ? (
                        <><FiCheckCircle /> Connected</>
                      ) : (
                        <><FiXCircle /> Disconnected</>
                      )}
                    </div>
                  </div>
                </div>

                <div className="platform-item">
                  <div className="platform-info">
                    <div className="platform-name">Twitter</div>
                    <div className={`platform-status ${platformConnections.twitter ? 'connected' : 'disconnected'}`}>
                      {platformConnections.twitter ? (
                        <><FiCheckCircle /> Connected</>
                      ) : (
                        <><FiXCircle /> Disconnected</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button className="manage-connections-btn" onClick={() => navigate('/connections')}>
                <FiLink2 /> Manage Connections
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardMain;

