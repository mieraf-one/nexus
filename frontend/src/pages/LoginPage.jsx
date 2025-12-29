import React, { useState } from 'react';
import './css/LoginPage.css';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <a href="#" className="logo-link">
            <div className="logo-icon">
              <span className="material-symbols-outlined">all_inclusive</span>
            </div>
            <h2 className="logo-text">Nexus</h2>
          </a>
          <div className="header-actions">
            <span className="header-label">New to Nexus?</span>
            <Link to={'/signup'} className='signup-button'>Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <div className="blur-circle primary-blur"></div>
        <div className="blur-circle pink-blur"></div>

        <div className="content-grid">
          {/* Left Hero Section (Desktop only) */}
          <div className="hero-section">
            <div className="hero-tag">
              <span className="pulse-dot"></span>
              <span className="tag-text">Join the community</span>
            </div>
            <h1 className="hero-title">
              Continue your <br />
              <span className="highlight">journey here.</span>
            </h1>
            <p className="hero-description">
              Log in to connect with friends, share your passions, and discover a world of creativity waiting for you.
            </p>

            <div className="social-proof">
              <div className="avatars">
                <div 
                  className="avatar" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFniLr9qQ4CyMr7gt_qH24PZq4DIBiAoXewcG0PV1tilRCyEE5kMENVO3PA-BDYFeOKp7kX8wLfwEJ7ZRaCM6Ud8MX5XZDJq6NEABH8fIRUGzXPC6ZeahQeSXt3Oa6rC6shhdl7b_wCOM-H3QW55eMINzf5nKVUeAU7LLFct__MMyEYJU2RHCLjJyBt7W67fYv2aDn3cgLs6PH2aZp-ZMtuDpkiGGAzqykfmuNHuzPHu9tTsS8fRgCCkt0wyDv4Dqny52Kj7EZpN3y")' }}
                ></div>
                <div 
                  className="avatar" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc")' }}
                ></div>
                <div 
                  className="avatar" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCAvytpHetbHBoclqocctShLueN0d3j1vLCCILREkyMzOLXw9e5auSU6C6KoAjoQ2RDfwPu_2Bz6AF5hswBmDaiWEhs4YWbqSiRostSwEYvn_Y0E3FJYNO4yFegf-hzyglelo9Fud_Ck0lSLrw7f10Dk82uT4A_LJrL3WBfxT1285e-0ljpmVhW59dduWOmxRWfsd2HJA7qBMQwYEKWRBeUIf7R8UoQREBSS3a4qi9hG7SEwWyEtGhtLJy_79YA2DDQN-3P-qFLOjL")' }}
                ></div>
                <div className="avatar-plus">+2k</div>
              </div>
              <div className="join-count">Join 10,000+ creators today</div>
            </div>

            <div className="features">
              <div className="feature">
                <span className="material-symbols-outlined">check_circle</span>
                Free Forever
              </div>
              <div className="feature">
                <span className="material-symbols-outlined">check_circle</span>
                No Credit Card
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="form-card">
            <div className="form-blur"></div>
            <div className="form-content">
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">Enter your details to access your account.</p>

              <LoginForm />

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="copyright">© 2023 Nexus Inc. All rights reserved.</div>
          <div className="footer-links">
            <a href="#">Help Center</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;