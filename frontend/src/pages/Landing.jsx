import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      {/* Header */}
      <header className="landing__header">
        <div className="landing__brand">BizBoost</div>
        <nav className="landing__nav">
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <Link to="/login" className="btn btn--ghost">Sign In</Link>
          <Link to="/register" className="btn btn--primary">Get Started</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="section hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="tag-icon">⭐</span>
              <span>Professional Social Media Automation</span>
            </div>
            <h1 className="title">
              <span className="title-line">ELEVATE</span>
              <span className="title-line title-accent">YOUR</span>
              <span className="title-line">BUSINESS</span>
            </h1>
            <p className="subtitle">Transform your social media strategy with professional-grade content generation, intelligent scheduling, and comprehensive analytics that drive measurable business results across all platforms.</p>
            <div className="cta-row">
              <Link to="/register" className="btn btn--primary btn--lg">
                Start Free Trial
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/login" className="btn btn--secondary btn--lg">Watch Demo</Link>
            </div>
          </div>
          <div className="hero-preview">
            <div className="ai-background">AI</div>
            <div className="hero-window">
              <div className="window-header">
                <div className="window-icon">📄</div>
                <div className="window-title">Content Generated</div>
                <div className="window-time">Just now</div>
              </div>
              <div className="window-content">
                <div className="content-text">"Unlock your potential with innovative solutions that drive growth and success..."</div>
                <div className="content-actions">
                  <div className="platform-buttons">
                    <div className="platform-btn instagram"></div>
                    <div className="platform-btn facebook"></div>
                    <div className="platform-btn linkedin"></div>
                  </div>
                  <button className="schedule-btn">Schedule</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section features">
        <div className="container">
          <div className="features-header">
            <h2 className="section-title">
              Enterprise-Grade Features for <span className="title-accent">Professional Teams</span>
            </h2>
            <p className="features-subtitle">Everything you need to create, schedule, and optimize your social media presence with professional-grade tools and comprehensive analytics.</p>
          </div>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <div className="icon-square">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <rect x="7" y="7" width="10" height="10" rx="1" fill="currentColor" fillOpacity="0.2"/>
                    <path d="M17 9L15 11L13 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3>AI Content Generation</h3>
              <p>Create engaging posts and stunning visuals with advanced AI technology.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <div className="icon-square">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <h3>Smart Scheduling</h3>
              <p>Schedule posts across multiple platforms with optimal timing recommendations.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <div className="icon-square">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
                    <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <h3>Advanced Analytics</h3>
              <p>Track performance with detailed insights and engagement metrics.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <div className="icon-square">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="9,11 12,8 15,11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="8" x2="12" y2="20" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <h3>AI Recommendations</h3>
              <p>Get personalized suggestions to boost your social media strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="section how">
        <div className="container">
          <div className="how-header">
            <h2 className="section-title">How It Works</h2>
            <p className="how-subtitle">Get started in minutes with our streamlined workflow designed for maximum efficiency.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-icon">
                <div className="icon-square">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <h3>Connect Your Accounts</h3>
              <p>Link your social media platforms with secure OAuth authentication.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-icon">
                <div className="icon-square">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3>Generate Content</h3>
              <p>Use AI to create engaging posts and stunning visuals tailored to your brand.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-icon">
                <div className="icon-square">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3>Schedule & Analyze</h3>
              <p>Schedule posts at optimal times and track performance with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="section previews">
        <div className="container">
          <h2 className="section-title">Product preview</h2>
          <div className="previews-grid">
            <div className="preview-card">
              <div className="preview-shot shot-1" />
              <h4>AI Content</h4>
              <p>Generate captions and hashtags that match your brand tone.</p>
            </div>
            <div className="preview-card">
              <div className="preview-shot shot-2" />
              <h4>Scheduler</h4>
              <p>Drag-and-drop planner for effortless campaign management.</p>
            </div>
            <div className="preview-card">
              <div className="preview-shot shot-3" />
              <h4>Analytics</h4>
              <p>Clear insights to guide your content strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="container">
          <h2 className="section-title">Loved by growing brands</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <p>“BizBoost cut our content creation time by 70%. Our engagement has never been higher.”</p>
              <div className="author">— Priya, D2C Founder</div>
            </div>
            <div className="testimonial">
              <p>“The scheduler and analytics are game-changers. We finally have a repeatable workflow.”</p>
              <div className="author">— Arjun, Marketing Lead</div>
            </div>
            <div className="testimonial">
              <p>“Perfect for small teams. AI helps us maintain brand voice without the overhead.”</p>
              <div className="author">— Neha, Content Strategist</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section pricing">
        <div className="container">
          <div className="pricing-header">
            <h2 className="section-title">Professional Pricing Plans</h2>
            <p className="pricing-subtitle">Choose the perfect plan for your business. All plans include enterprise-grade security and support.</p>
          </div>
          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-badge">Starter</div>
              <div className="price-description">Perfect for individuals and small businesses</div>
              <div className="price-amount">$9<span>/month</span></div>
              <ul className="price-features">
                <li>✓ 50 AI-generated posts per month</li>
                <li>✓ 3 social media accounts</li>
                <li>✓ Basic analytics</li>
                <li>✓ Email support</li>
              </ul>
              <Link to="/register" className="btn btn--primary btn--block">Start Free Trial</Link>
            </div>
            <div className="price-card recommended">
              <div className="popular-badge">Most Popular</div>
              <div className="price-badge">Professional</div>
              <div className="price-description">Ideal for growing businesses and agencies</div>
              <div className="price-amount">$29<span>/month</span></div>
              <ul className="price-features">
                <li>✓ 200 AI-generated posts per month</li>
                <li>✓ 10 social media accounts</li>
                <li>✓ Advanced analytics & insights</li>
                <li>✓ Priority support</li>
                <li>✓ Custom branding</li>
                <li>✓ Team collaboration</li>
              </ul>
              <Link to="/register" className="btn btn--primary btn--block">Start Free Trial</Link>
            </div>
            <div className="price-card">
              <div className="price-badge">Enterprise</div>
              <div className="price-description">For large organizations with advanced needs</div>
              <div className="price-amount">$99<span>/month</span></div>
              <ul className="price-features">
                <li>✓ Unlimited AI-generated posts</li>
                <li>✓ Unlimited social media accounts</li>
                <li>✓ White-label solution</li>
                <li>✓ Dedicated account manager</li>
                <li>✓ Custom integrations</li>
                <li>✓ Advanced security features</li>
              </ul>
              <Link to="/register" className="btn btn--primary btn--block">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section final-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Elevate Your Business Presence?</h2>
            <p className="cta-subtitle">Join thousands of professionals already using BizBoost to streamline their social media and achieve measurable business growth.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn--primary btn--lg">
                Start Your Free Trial
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/login" className="btn btn--secondary btn--lg">Schedule Demo</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="landing__brand">BizBoost</div>
            <p className="footer-description">A professional social media automation platform that streamlines content creation, scheduling, and analytics for modern businesses.</p>
            <div className="social-icons">
              <div className="social-icon">🛡️</div>
              <div className="social-icon">🐦</div>
              <div className="social-icon">💼</div>
              <div className="social-icon">✉️</div>
            </div>
          </div>
          <div className="footer-column">
            <h4>Product</h4>
            <nav>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#analytics">Analytics</a>
              <a href="#integrations">Integrations</a>
            </nav>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <nav>
              <a href="#docs">Documentation</a>
              <a href="#api">API Reference</a>
              <a href="#blog">Blog</a>
              <a href="#support">Support</a>
            </nav>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <nav>
              <a href="#about">About</a>
              <a href="#careers">Careers</a>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}


