import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import DashboardSidebar from '../components/DashboardSidebar';
import { useSidebar } from '../hooks/useSidebar';
import '../styles/Create.css';

const Create = () => {
  const { sidebarOpen, toggleSidebar, handleNavClick } = useSidebar();
  const [selectedPostType, setSelectedPostType] = useState('promotional');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    platforms: [],
    hashtags: '',
    mediaType: 'text'
  });
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');

  const postTypes = [
    {
      id: 'promotional',
      name: 'Promotional',
      description: 'Product launches, sales, offers',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
      color: '#f59e0b'
    },
    {
      id: 'educational',
      name: 'Educational',
      description: 'Tips, tutorials, how-tos',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
      color: '#10b981'
    },
    {
      id: 'engaging',
      name: 'Engaging',
      description: 'Questions, polls, discussions',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M13 8H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 12H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#8b5cf6'
    },
    {
      id: 'inspirational',
      name: 'Inspirational',
      description: 'Motivation, quotes, success stories',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
      color: '#ef4444'
    }
  ];

  const platforms = [
    { id: 'facebook', name: 'Facebook', color: '#1877f2' },
    { id: 'instagram', name: 'Instagram', color: '#e4405f' },
    { id: 'linkedin', name: 'LinkedIn', color: '#0a66c2' },
    { id: 'twitter', name: 'Twitter', color: '#1da1f2' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlatformChange = (platformId) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const handleGenerateContent = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a title for your post');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post('/ai/generate-content', {
        type: selectedPostType,
        title: formData.title,
        context: formData.content,
        platforms: formData.platforms
      });
      
      setGeneratedContent(response.data.content);
      setFormData(prev => ({
        ...prev,
        content: response.data.content,
        hashtags: response.data.hashtags || ''
      }));
    } catch (error) {
      console.error('Error generating content:', error);
      // Fallback content for demo
      setGeneratedContent(`🚀 ${formData.title}

${selectedPostType === 'promotional' ? 'Introducing our latest product that will revolutionize your business!' :
  selectedPostType === 'educational' ? 'Here are 5 key tips to improve your productivity:' :
  selectedPostType === 'engaging' ? 'What\'s your biggest challenge in business right now? Share your thoughts below!' :
  'Success is not final, failure is not fatal: it is the courage to continue that counts.'}

#${selectedPostType} #business #success`);
      
      setFormData(prev => ({
        ...prev,
        content: generatedContent,
        hashtags: `#${selectedPostType} #business #success`
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      await axios.post('/posts', {
        ...formData,
        status: 'draft'
      });
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft');
    }
  };

  const handleSchedule = () => {
    // Redirect to calendar with pre-filled data
    const queryParams = new URLSearchParams(formData);
    window.location.href = `/calendar?${queryParams.toString()}`;
  };

  const handlePublish = async () => {
    try {
      await axios.post('/posts', {
        ...formData,
        status: 'published',
        publishedAt: new Date().toISOString()
      });
      alert('Post published successfully!');
    } catch (error) {
      console.error('Error publishing post:', error);
      alert('Failed to publish post');
    }
  };

  return (
    <div className="create-page">
      <DashboardSidebar 
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onNavClick={handleNavClick}
      />

      {/* Main Content */}
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="page-header">
          <h1>AI Content Generator</h1>
          <p>Create engaging posts using AI for your connected social media accounts</p>
        </div>

        <div className="content-container">
          {/* Post Type Selection */}
          <div className="post-types-section">
            <h2>Choose Post Type</h2>
            <div className="post-types-grid">
              {postTypes.map((type) => (
                <div
                  key={type.id}
                  className={`post-type-card ${selectedPostType === type.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPostType(type.id)}
                  style={{ '--accent-color': type.color }}
                >
                  <div className="card-icon" style={{ color: type.color }}>
                    {type.icon}
                  </div>
                  <h3>{type.name}</h3>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content Editor */}
          <div className="content-editor-section">
            <div className="editor-header">
              <h2>Content Editor</h2>
              <div className="preview-toggle">
                <button 
                  className={`preview-btn ${previewMode === 'desktop' ? 'active' : ''}`}
                  onClick={() => setPreviewMode('desktop')}
                >
                  Desktop
                </button>
                <button 
                  className={`preview-btn ${previewMode === 'mobile' ? 'active' : ''}`}
                  onClick={() => setPreviewMode('mobile')}
                >
                  Mobile
                </button>
              </div>
            </div>

            <div className="editor-form">
              <div className="form-group">
                <label htmlFor="title">Post Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a title for your post..."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Post Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Describe what you want to post about..."
                  className="form-textarea"
                  rows={6}
                />
              </div>

              <div className="form-group">
                <label>Platforms</label>
                <div className="platform-selector">
                  {platforms.map((platform) => (
                    <label key={platform.id} className="platform-option">
                      <input
                        type="checkbox"
                        checked={formData.platforms.includes(platform.id)}
                        onChange={() => handlePlatformChange(platform.id)}
                      />
                      <span className="platform-name" style={{ '--platform-color': platform.color }}>
                        {platform.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="hashtags">Hashtags</label>
                <input
                  type="text"
                  id="hashtags"
                  name="hashtags"
                  value={formData.hashtags}
                  onChange={handleInputChange}
                  placeholder="#hashtag1 #hashtag2 #hashtag3"
                  className="form-input"
                />
              </div>

              <div className="editor-actions">
                <button 
                  onClick={handleGenerateContent}
                  disabled={isGenerating}
                  className="btn btn-primary btn-large"
                >
                  {isGenerating ? (
                    <>
                      <div className="spinner"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      Generate Post
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Post Preview */}
          <div className="post-preview-section">
            <h2>Preview</h2>
            <div className={`preview-container ${previewMode}`}>
              <div className="preview-card">
                <div className="preview-header">
                  <div className="preview-avatar"></div>
                  <div className="preview-info">
                    <div className="preview-name">Your Business</div>
                    <div className="preview-time">Now</div>
                  </div>
                </div>
                <div className="preview-content">
                  {formData.content || (
                    <div className="preview-placeholder">
                      <p>Your generated content will appear here...</p>
                    </div>
                  )}
                </div>
                {formData.hashtags && (
                  <div className="preview-hashtags">
                    {formData.hashtags}
                  </div>
                )}
                <div className="preview-actions">
                  <div className="preview-platforms">
                    {formData.platforms.map((platform) => (
                      <span key={platform} className="platform-badge" style={{ '--platform-color': platforms.find(p => p.id === platform)?.color }}>
                        {platforms.find(p => p.id === platform)?.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={handleSaveDraft} className="btn btn-secondary">
              <svg viewBox="0 0 24 24">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17,21 17,13 7,13 7,21"/>
                <polyline points="7,3 7,8 15,8"/>
              </svg>
              Save Draft
            </button>
            <button onClick={handleSchedule} className="btn btn-secondary">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Schedule Post
            </button>
            <button onClick={handlePublish} className="btn btn-primary">
              <svg viewBox="0 0 24 24">
                <path d="M14 7l-5 5 5 5V7z"/>
                <path d="M20 12H8"/>
              </svg>
              Publish Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;