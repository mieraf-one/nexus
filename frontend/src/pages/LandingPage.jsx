import './css/LandingPage.css';

function LandingPage() {
  return (
    <div className="nexus-landing">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div className="logo-icon">
              <span className="material-symbols-outlined">all_inclusive</span>
            </div>
            <h1 className="logo-text">Nexus</h1>
          </div>
          <nav className="nav">
            <a href="#" className="nav-link">Features</a>
            <a href="#" className="nav-link">Community</a>
            <a href="#" className="nav-link">Support</a>
          </nav>
          <div className="header-actions">
            <button className="login-btn">Log In</button>
            <button className="signup-btn">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Connect <span className="highlight">Beyond Limits.</span>
            </h1>
            <p className="hero-desc">
              Join Nexus, the vibrant community where creativity meets connection. Share your world, discover new passions, and find your people.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn">Join Nexus Free</button>
              <button className="secondary-btn">Explore Communities</button>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="social-proof">
          <h3 className="social-title">Join a growing community of creators</h3>
          <div className="avatars">
            <div className="avatar avatar-1"></div>
            <div className="avatar avatar-2"></div>
            <div className="avatar avatar-3"></div>
            <div className="avatar avatar-4"></div>
            <div className="avatar-more">+2k</div>
          </div>
          <p className="social-caption">Trusted by over 10,000 communities worldwide</p>
        </section>

        {/* Features */}
        <section className="features">
          <div className="features-header">
            <span className="tag">Why Nexus?</span>
            <h2 className="features-title">
              Experience the Future of Social
            </h2>
            <p className="features-desc">
              Designed for connection, built for you. Discover tools that empower your social life.
            </p>
          </div>
          <div className="features-grid">
            <FeatureCard 
              icon="groups" 
              title="Find Your Tribe" 
              desc="Connect effortlessly with friends and like-minded groups who share your specific passions and interests."
            />
            <FeatureCard 
              icon="palette" 
              title="Express Yourself" 
              desc="Share photos, videos, and stories with intuitive creative tools designed to make your content pop."
            />
            <FeatureCard 
              icon="bolt" 
              title="Never Miss a Beat" 
              desc="A personalized feed algorithm that cuts through the noise and brings the best content directly to you."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="cta-card">
            <div className="cta-dots"></div>
            <div className="cta-content">
              <h2 className="cta-title">Ready to start connecting?</h2>
              <p className="cta-desc">Join the fastest growing social network today and see what everyone is talking about.</p>
              <button className="cta-btn">Create Your Free Account</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <span className="material-symbols-outlined">all_inclusive</span>
            <span>Nexus</span>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
          <div className="footer-copyright">
            © 2023 Nexus Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Feature Card Component
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="feature-content">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{desc}</p>
      </div>
    </div>
  );
}

export default LandingPage;