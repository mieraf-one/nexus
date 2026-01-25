import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './css/LandingPage.module.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to={'/dashboard'} />
  }

  return (
    <div className={styles.nexusApp}>
      {/* Header */}
      <header className={styles.nexusHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <div className={styles.logoIcon}>
              <span className="material-symbols-outlined">all_inclusive</span>
            </div>
            <h2 className={styles.logoText}>Nexus</h2>
          </div>
          
          <nav className={styles.headerNav}>
            <a href="#" className={styles.navLink}>Features</a>
            <a href="#" className={styles.navLink}>Community</a>
            <a href="#" className={styles.navLink}>Support</a>
          </nav>
          
          <div className={styles.headerButtons}>
            <Link to={'/login'} className={styles.loginBtn}>Log In</Link>
            <Link to={'/signup'} className={styles.signupBtn}>Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.nexusMain}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>
              Connect <span className={styles.gradientText}>Beyond Limits.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Join Nexus, the vibrant community where creativity meets connection. Share your world, discover new passions, and find your people.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.primaryBtn}>Join Nexus Free</button>
              <button className={styles.secondaryBtn}>Explore Communities</button>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className={styles.statsSection}>
          <div className={styles.statsContainer}>
            <h3 className={styles.statsTitle}>Join a growing community of creators</h3>
            <div className={styles.avatarStack}>
              <div className={styles.avatar} style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCFniLr9qQ4CyMr7gt_qH24PZq4DIBiAoXewcG0PV1tilRCyEE5kMENVO3PA-BDYFeOKp7kX8wLfwEJ7ZRaCM6Ud8MX5XZDJq6NEABH8fIRUGzXPC6ZeahQeSXt3Oa6rC6shhdl7b_wCOM-H3QW55eMINzf5nKVUeAU7LLFct__MMyEYJU2RHCLjJyBt7W67fYv2aDn3cgLs6PH2aZp-ZMtuDpkiGGAzqykfmuNHuzPHu9tTsS8fRgCCkt0wyDv4Dqny52Kj7EZpN3y)' }}></div>
              <div className={styles.avatar} style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc)' }}></div>
              <div className={styles.avatar} style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCCAvytpHetbHBoclqocctShLueN0d3j1vLCCILREkyMzOLXw9e5auSU6C6KoAjoQ2RDfwPu_2Bz6AF5hswBmDaiWEhs4YWbqSiRostSwEYvn_Y0E3FJYNO4yFegf-hzyglelo9Fud_Ck0lSLrw7f10Dk82uT4A_LJrL3WBfxT1285e-0ljpmVhW59dduWOmxRWfsd2HJA7qBMQwYEKWRBeUIf7R8UoQREBSS3a4qi9hG7SEwWyEtGhtLJy_79YA2DDQN-3P-qFLOjL)' }}></div>
              <div className={styles.avatar} style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDlq1M1MGGt0eKcXODBfGkPcBawBYu_18UZ6biXFlrQdmyXE5CClkjDPWPleIldHb5suWVDhtEQP5I2GQH_QOPW7DmtYS7IyCuhA5NkH-TFFpA6eB7_CIB_hWJVCnUjyQ2vCN84ugMttKwojgInPjWcE1zVWnZbNLlDnFgyUydW8wc_WJuPwM_fRa2Zx6T17hVoAkB3UbY7Hn8GCW3Upv7NnA_PpVn-e_RL3hefEHjMs_WUpMqEqwytRlKuJCgHtkmhIC5Ahfp05WMr)' }}></div>
              <div className={styles.avatarCount}>+2k</div>
            </div>
            <p className={styles.statsSubtitle}>Trusted by over 10,000 communities worldwide</p>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <div className={styles.featuresContainer}>
            <div className={styles.featuresHeader}>
              <span className={styles.badge}>Why Nexus?</span>
              <h2 className={styles.featuresTitle}>Experience the Future of Social</h2>
              <p className={styles.featuresSubtitle}>
                Designed for connection, built for you. Discover tools that empower your social life.
              </p>
            </div>
            
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <h3 className={styles.featureTitle}>Find Your Tribe</h3>
                <p className={styles.featureDescription}>
                  Connect effortlessly with friends and like-minded groups who share your specific passions and interests.
                </p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <span className="material-symbols-outlined">palette</span>
                </div>
                <h3 className={styles.featureTitle}>Express Yourself</h3>
                <p className={styles.featureDescription}>
                  Share photos, videos, and stories with intuitive creative tools designed to make your content pop.
                </p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <h3 className={styles.featureTitle}>Never Miss a Beat</h3>
                <p className={styles.featureDescription}>
                  A personalized feed algorithm that cuts through the noise and brings the best content directly to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <div className={styles.ctaPattern}></div>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to start connecting?</h2>
              <p className={styles.ctaSubtitle}>
                Join the fastest growing social network today and see what everyone is talking about.
              </p>
              <Link to={'/signup'} className={styles.ctaButton}>Create Your Free Account</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.nexusFooter}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>
            <span className="material-symbols-outlined">all_inclusive</span>
            <span className={styles.footerLogoText}>Nexus</span>
          </div>
          
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
            <a href="#" className={styles.footerLink}>Cookies</a>
          </div>
          
          <div className={styles.footerCopyright}>
            © 2026 Nexus Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;