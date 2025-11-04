import React, { useState } from 'react';
import axios from '../api/axios';
import '../styles/AIContentGenerator.css';

const AIContentGenerator = () => {
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('casual');
  const [industry, setIndustry] = useState('general');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('generate');

  const tones = [
    { value: 'casual', label: 'Casual & Friendly' },
    { value: 'professional', label: 'Professional' },
    { value: 'creative', label: 'Creative & Inspiring' },
    { value: 'humorous', label: 'Humorous & Fun' },
    { value: 'motivational', label: 'Motivational' }
  ];

  const industries = [
    { value: 'general', label: 'General' },
    { value: 'fashion', label: 'Fashion & Beauty' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'travel', label: 'Travel & Tourism' },
    { value: 'fitness', label: 'Fitness & Health' },
    { value: 'business', label: 'Business & Professional' },
    { value: 'technology', label: 'Technology' },
    { value: 'lifestyle', label: 'Lifestyle' }
  ];

  const generateContent = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedContent(null);

    try {
      const response = await axios.post('/instagram/generate', {
        description: description.trim(),
        tone,
        industry
      });

      setGeneratedContent(response.data);
    } catch (error) {
      console.error('Error generating content:', error);
      setError(error.response?.data?.error || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const generateVariations = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    setError('');
    setVariations([]);

    try {
      const response = await axios.post('/instagram/variations', {
        description: description.trim(),
        tone,
        count: 3
      });

      setVariations(response.data.variations);
    } catch (error) {
      console.error('Error generating variations:', error);
      setError(error.response?.data?.error || 'Failed to generate variations');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'generate') {
      generateContent();
    } else if (activeTab === 'variations') {
      generateVariations();
    }
  };

  return (
    <div className="ai-content-generator">
      <div className="generator-header">
        <h2>🤖 AI Content Generator</h2>
        <p>Generate engaging Instagram captions and hashtags with AI</p>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          Generate Content
        </button>
        <button 
          className={`tab-button ${activeTab === 'variations' ? 'active' : ''}`}
          onClick={() => setActiveTab('variations')}
        >
          Content Variations
        </button>
      </div>

      <form onSubmit={handleSubmit} className="generator-form">
        <div className="form-group">
          <label htmlFor="description">Post Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your post or image (e.g., 'photo of a sunset on the beach', 'new product launch', 'behind the scenes at our office')"
            rows="4"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tone">Tone</label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              {tones.map(toneOption => (
                <option key={toneOption.value} value={toneOption.value}>
                  {toneOption.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="industry">Industry</label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              {industries.map(industryOption => (
                <option key={industryOption.value} value={industryOption.value}>
                  {industryOption.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="generate-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="loading-spinner"></div>
              Generating...
            </>
          ) : (
            <>
              <span>✨</span>
              {activeTab === 'generate' ? 'Generate Content' : 'Generate Variations'}
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Generated Content Display */}
      {generatedContent && activeTab === 'generate' && (
        <div className="generated-content">
          <h3>Generated Content</h3>
          
          <div className="content-section">
            <div className="section-header">
              <h4>📝 Caption</h4>
              <button 
                onClick={() => copyToClipboard(generatedContent.caption)}
                className="copy-button"
              >
                Copy
              </button>
            </div>
            <div className="content-text">
              {generatedContent.caption}
            </div>
          </div>

          {generatedContent.hashtags && (
            <div className="content-section">
              <div className="section-header">
                <h4>🏷️ Hashtags</h4>
                <button 
                  onClick={() => copyToClipboard(generatedContent.hashtags)}
                  className="copy-button"
                >
                  Copy
                </button>
              </div>
              <div className="content-text hashtags">
                {generatedContent.hashtags}
              </div>
            </div>
          )}

          <div className="content-actions">
            <button 
              onClick={() => copyToClipboard(`${generatedContent.caption}\n\n${generatedContent.hashtags}`)}
              className="copy-all-button"
            >
              Copy All Content
            </button>
          </div>
        </div>
      )}

      {/* Content Variations Display */}
      {variations.length > 0 && activeTab === 'variations' && (
        <div className="generated-content">
          <h3>Content Variations</h3>
          
          {variations.map((variation, index) => (
            <div key={variation.id} className="variation-card">
              <div className="variation-header">
                <h4>Variation {variation.id}</h4>
                <button 
                  onClick={() => copyToClipboard(`${variation.caption}\n\n${variation.hashtags}`)}
                  className="copy-button"
                >
                  Copy All
                </button>
              </div>
              
              <div className="content-section">
                <div className="section-header">
                  <h5>📝 Caption</h5>
                  <button 
                    onClick={() => copyToClipboard(variation.caption)}
                    className="copy-button small"
                  >
                    Copy
                  </button>
                </div>
                <div className="content-text">
                  {variation.caption}
                </div>
              </div>

              {variation.hashtags && (
                <div className="content-section">
                  <div className="section-header">
                    <h5>🏷️ Hashtags</h5>
                    <button 
                      onClick={() => copyToClipboard(variation.hashtags)}
                      className="copy-button small"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="content-text hashtags">
                    {variation.hashtags}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIContentGenerator;
