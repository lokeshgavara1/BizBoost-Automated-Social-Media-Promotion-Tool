// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardSidebar from '../components/DashboardSidebar';
import { useSidebar } from '../hooks/useSidebar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [connectedUsername, setConnectedUsername] = useState('');
  const { sidebarOpen, toggleSidebar, handleNavClick } = useSidebar();

  useEffect(() => {
    // Check for social media connection success messages
    const instagramConnected = searchParams.get('instagram_connected');
    const facebookConnected = searchParams.get('facebook_connected');
    const linkedinConnected = searchParams.get('linkedin_connected');
    const username = searchParams.get('username');
    const platform = searchParams.get('platform') || 'Social Media';
    
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

        <div className="landing-content">
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-content">
              <div className="hero-text">
                <div className="hero-badge">
                  <svg className="badge-icon" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Professional Social Media Automation</span>
                </div>
                
                <h1 className="hero-title">
                  <span className="title-line">ELEVATE</span>
                  <span className="title-line title-accent">YOUR</span>
                  <span className="title-line">BUSINESS</span>
                </h1>
                
                <p className="hero-subtitle">
                  Transform your social media strategy with professional-grade content generation, intelligent scheduling, and comprehensive analytics that drive measurable business results across all platforms.
                </p>
                
                <div className="hero-actions">
                  <Link to="/dashboard" className="btn btn-primary">
                    Go to Dashboard
                    <svg className="btn-arrow" viewBox="0 0 24 24">
                      <path d="M5 12h14m-7-7l7 7-7 7"/>
                    </svg>
                  </Link>
                  <button className="btn btn-secondary">Watch Demo</button>
                </div>
              </div>
              
              <div className="hero-visual">
                <div className="ai-background">AI</div>
                <div className="content-card">
                  <div className="card-header">
                    <svg className="content-icon" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    <div className="card-title">Content Generated</div>
                    <div className="card-time">Just now</div>
                  </div>
                  <div className="card-content">
                    <div className="content-text">
                      "Unlock your potential with innovative solutions that drive growth and success..."
                    </div>
                    <div className="content-actions">
                      <div className="color-swatches">
                        <div className="swatch blue"></div>
                        <div className="swatch pink"></div>
                        <div className="swatch blue"></div>
                      </div>
                      <button className="schedule-btn">Schedule</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>

          {/* Features Section */}
          <section id="features" className="features">
            <div className="section-header">
              <div className="section-label">FEATURES</div>
              <h2 className="section-title">
                Enterprise-Grade Features for <span className="title-accent">Professional Teams</span>
              </h2>
              <p className="section-subtitle">
                Everything you need to create, schedule, and optimize your social media presence with professional-grade tools and comprehensive analytics.
              </p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <rect x="7" y="7" width="10" height="10" rx="1" fill="currentColor" fillOpacity="0.2"/>
                    <path d="M17 9L15 11L13 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
          <h3>AI Content Generation</h3>
                <p>Create engaging posts and stunning visuals with advanced AI technology that understands your brand voice.</p>
          </div>
          
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>Smart Scheduling</h3>
                <p>Schedule posts across multiple platforms with optimal timing recommendations based on your audience behavior.</p>
          </div>
          
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24">
                    <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
                    <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>Advanced Analytics</h3>
                <p>Track performance with detailed insights and engagement metrics that help you understand what works.</p>
          </div>
          
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="9,11 12,8 15,11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="8" x2="12" y2="20" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>AI Recommendations</h3>
                <p>Get personalized suggestions and actionable insights to boost your social media strategy and performance.</p>
              </div>
          </div>
        </section>

          {/* How It Works Section */}
          <section className="how-it-works">
            <div className="section-header">
              <div className="section-label">HOW IT WORKS</div>
              <h2 className="section-title">
                How It <span className="title-accent">Works</span>
              </h2>
              <p className="section-subtitle">
                Get started in minutes with our streamlined workflow designed for maximum efficiency.
              </p>
            </div>
            
            <div className="steps-container">
              <div className="step">
                <div className="step-number">01</div>
                <div className="step-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Connect Your Accounts</h3>
                <p>Link your social media platforms with secure OAuth authentication in just a few clicks.</p>
              </div>
              
              <div className="step">
                <div className="step-number">02</div>
                <div className="step-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Generate Content</h3>
                <p>Use AI to create engaging posts and stunning visuals tailored to your brand and audience.</p>
              </div>
              
              <div className="step">
                <div className="step-number">03</div>
                <div className="step-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Schedule & Analyze</h3>
                <p>Schedule posts at optimal times and track performance with detailed analytics and insights.</p>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="pricing">
            <div className="section-header">
              <div className="section-label">PRICING</div>
              <h2 className="section-title">
                Professional <span className="title-accent">Pricing Plans</span>
              </h2>
              <p className="section-subtitle">
                Choose the perfect plan for your business. All plans include enterprise-grade security and support.
              </p>
            </div>
            
            <div className="pricing-grid">
              <div className="pricing-card">
                <div className="pricing-badge">Starter</div>
                <div className="pricing-description">Perfect for individuals and small businesses</div>
                <div className="pricing-price">
                  <span className="price-amount">$9</span>
                  <span className="price-period">/month</span>
                </div>
                <ul className="pricing-features">
                  <li>✓ 50 AI-generated posts per month</li>
                  <li>✓ 3 social media accounts</li>
                  <li>✓ Basic analytics</li>
                  <li>✓ Email support</li>
                </ul>
                <Link to="/dashboard" className="btn btn-primary btn-full">Start Free Trial</Link>
              </div>
              
              <div className="pricing-card featured">
                <div className="popular-badge">Most Popular</div>
                <div className="pricing-badge">Professional</div>
                <div className="pricing-description">Ideal for growing businesses and agencies</div>
                <div className="pricing-price">
                  <span className="price-amount">$29</span>
                  <span className="price-period">/month</span>
                </div>
                <ul className="pricing-features">
                  <li>✓ 200 AI-generated posts per month</li>
                  <li>✓ 10 social media accounts</li>
                  <li>✓ Advanced analytics & insights</li>
                  <li>✓ Priority support</li>
                  <li>✓ Custom branding</li>
                  <li>✓ Team collaboration</li>
                </ul>
                <Link to="/dashboard" className="btn btn-primary btn-full">Start Free Trial</Link>
              </div>
              
              <div className="pricing-card">
                <div className="pricing-badge">Enterprise</div>
                <div className="pricing-description">For large organizations with advanced needs</div>
                <div className="pricing-price">
                  <span className="price-amount">$99</span>
                  <span className="price-period">/month</span>
                </div>
                <ul className="pricing-features">
                  <li>✓ Unlimited AI-generated posts</li>
                  <li>✓ Unlimited social media accounts</li>
                  <li>✓ White-label solution</li>
                  <li>✓ Dedicated account manager</li>
                  <li>✓ Custom integrations</li>
                  <li>✓ Advanced security features</li>
                </ul>
                <Link to="/dashboard" className="btn btn-primary btn-full">Start Free Trial</Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-content">
              <h2 className="cta-title">
                Ready to Elevate Your <span className="cta-highlight">Business Presence?</span>
              </h2>
              <p className="cta-subtitle">
                Join thousands of professionals already using BizBoost to streamline their social media and achieve measurable business growth.
              </p>
              <div className="cta-actions">
                <Link to="/dashboard" className="btn btn-primary btn-large">
                  Start Your Free Trial
                  <svg className="btn-arrow" viewBox="0 0 24 24">
                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                  </svg>
            </Link>
                <button className="btn btn-secondary btn-large">Schedule Demo</button>
              </div>
          </div>
        </section>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-brand">
                <h3>BizBoost</h3>
                <p>A professional social media automation platform that streamlines content creation, scheduling, and analytics for modern businesses.</p>
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="footer-links">
                <div className="footer-column">
                  <h4>Product</h4>
                  <ul>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#">Analytics</a></li>
                    <li><a href="#">Integrations</a></li>
                  </ul>
                </div>
                
                <div className="footer-column">
                  <h4>Resources</h4>
                  <ul>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">API Reference</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Support</a></li>
                  </ul>
                </div>
                
                <div className="footer-column">
                  <h4>Company</h4>
                  <ul>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
