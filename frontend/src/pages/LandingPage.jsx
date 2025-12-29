import './css/LandingPage.css';

export default function LandingPage() {
  return (
    <div className="nexus-landing">
      <Header />
      <main className="main-content">
        <Hero />
        <Community />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}


const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <span className="material-symbols-outlined">all_inclusive</span>
          </div>
          <h2 className="logo-text">Nexus</h2>
        </div>
        
        <nav className="nav-links">
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
  );
};


const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Connect <span className="highlight">Beyond Limits.</span>
            </h1>

            <p className="hero-description">
              Join Nexus, the vibrant community where creativity meets connection.
              Share your world, discover new passions, and find your people.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn">
                Join Nexus Free
              </button>

              <button className="secondary-btn">
                Explore Communities
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Community = () => {
  const userImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCFniLr9qQ4CyMr7gt_qH24PZq4DIBiAoXewcG0PV1tilRCyEE5kMENVO3PA-BDYFeOKp7kX8wLfwEJ7ZRaCM6Ud8MX5XZDJq6NEABH8fIRUGzXPC6ZeahQeSXt3Oa6rC6shhdl7b_wCOM-H3QW55eMINzf5nKVUeAU7LLFct__MMyEYJU2RHCLjJyBt7W67fYv2aDn3cgLs6PH2aZp-ZMtuDpkiGGAzqykfmuNHuzPHu9tTsS8fRgCCkt0wyDv4Dqny52Kj7EZpN3y',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCCAvytpHetbHBoclqocctShLueN0d3j1vLCCILREkyMzOLXw9e5auSU6C6KoAjoQ2RDfwPu_2Bz6AF5hswBmDaiWEhs4YWbqSiRostSwEYvn_Y0E3FJYNO4yFegf-hzyglelo9Fud_Ck0lSLrw7f10Dk82uT4A_LJrL3WBfxT1285e-0ljpmVhW59dduWOmxRWfsd2HJA7qBMQwYEKWRBeUIf7R8UoQREBSS3a4qi9hG7SEwWyEtGhtLJy_79YA2DDQN-3P-qFLOjL',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDlq1M1MGGt0eKcXODBfGkPcBawBYu_18UZ6biXFlrQdmyXE5CClkjDPWPleIldHb5suWVDhtEQP5I2GQH_QOPW7DmtYS7IyCuhA5NkH-TFFpA6eB7_CIB_hWJVCnUjyQ2vCN84ugMttKwojgInPjWcE1zVWnZbNLlDnFgyUydW8wc_WJuPwM_fRa2Zx6T17hVoAkB3UbY7Hn8GCW3Upv7NnA_PpVn-e_RL3hefEHjMs_WUpMqEqwytRlKuJCgHtkmhIC5Ahfp05WMr'
  ];

  return (
    <section className="community-section">
      <div className="community-content">
        <h3 className="community-title">Join a growing community of creators</h3>
        <div className="user-avatars">
          {userImages.map((image, index) => (
            <div 
              key={index}
              className="user-avatar"
              style={{ backgroundImage: `url("${image}")` }}
            />
          ))}
          <div className="more-users">
            +2k
          </div>
        </div>
        <p className="community-text">Trusted by over 10,000 communities worldwide</p>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: 'groups',
      title: 'Find Your Tribe',
      description: 'Connect effortlessly with friends and like-minded groups who share your specific passions and interests.'
    },
    {
      icon: 'palette',
      title: 'Express Yourself',
      description: 'Share photos, videos, and stories with intuitive creative tools designed to make your content pop.'
    },
    {
      icon: 'bolt',
      title: 'Never Miss a Beat',
      description: 'A personalized feed algorithm that cuts through the noise and brings the best content directly to you.'
    }
  ];

  return (
    <section className="features-section">
      <div className="features-content">
        <div className="features-header">
          <span className="badge">Why Nexus?</span>
          <h2 className="features-title">Experience the Future of Social</h2>
          <p className="features-subtitle">
            Designed for connection, built for you. Discover tools that empower your social life.
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <span className="material-symbols-outlined">{feature.icon}</span>
              </div>
              <div className="feature-content">
                <h3 className="feature-name">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <div className="cta-background" />
        <div className="cta-text">
          <h2 className="cta-title">Ready to start connecting?</h2>
          <p className="cta-description">
            Join the fastest growing social network today and see what everyone is talking about.
          </p>
          <button className="cta-button">
            Create Your Free Account
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="material-symbols-outlined">all_inclusive</span>
          <span className="footer-logo-text">Nexus</span>
        </div>
        
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Cookies</a>
        </div>
        
        <div className="footer-copyright">
          © 2023 Nexus Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};