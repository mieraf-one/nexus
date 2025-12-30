import React from 'react';
import styles from './css/LoginPage.module.css';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <Link to={'/'} className={styles.logoLink}>
              <div className={styles.logoIcon}>
                <span className="material-symbols-outlined">all_inclusive</span>
              </div>
              <h2 className={styles.logoText}>Nexus</h2>
            </Link>
          </div>
          
          <div className={styles.headerActions}>
            <span className={styles.newToNexus}>New to Nexus?</span>
            <Link to={'/signup'} className={styles.signUpButton}>Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Background Blurs */}
        <div className={styles.blurPrimary}></div>
        <div className={styles.blurPink}></div>
        
        <div className={styles.contentGrid}>
          {/* Left Side - Hero */}
          <div className={styles.heroSection}>
            <div className={styles.heroTag}>
              <span className={styles.pulseDot}></span>
              <span className={styles.tagText}>Join the community</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Continue your <br/>
              <span className={styles.primaryText}>journey here.</span>
            </h1>
            
            <p className={styles.heroDescription}>
              Log in to connect with friends, share your passions, and discover a world of creativity waiting for you.
            </p>
            
            {/* Social Proof Section */}
            <div className={styles.socialProof}>
              <div className={styles.avatars}>
                <div 
                  className={styles.avatar} 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFniLr9qQ4CyMr7gt_qH24PZq4DIBiAoXewcG0PV1tilRCyEE5kMENVO3PA-BDYFeOKp7kX8wLfwEJ7ZRaCM6Ud8MX5XZDJq6NEABH8fIRUGzXPC6ZeahQeSXt3Oa6rC6shhdl7b_wCOM-H3QW55eMINzf5nKVUeAU7LLFct__MMyEYJU2RHCLjJyBt7W67fYv2aDn3cgLs6PH2aZp-ZMtuDpkiGGAzqykfmuNHuzPHu9tTsS8fRgCCkt0wyDv4Dqny52Kj7EZpN3y")' }}
                ></div>
                <div 
                  className={styles.avatar} 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc")' }}
                ></div>
                <div 
                  className={styles.avatar} 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCAvytpHetbHBoclqocctShLueN0d3j1vLCCILREkyMzOLXw9e5auSU6C6KoAjoQ2RDfwPu_2Bz6AF5hswBmDaiWEhs4YWbqSiRostSwEYvn_Y0E3FJYNO4yFegf-hzyglelo9Fud_Ck0lSLrw7f10Dk82uT4A_LJrL3WBfxT1285e-0ljpmVhW59dduWOmxRWfsd2HJA7qBMQwYEKWRBeUIf7R8UoQREBSS3a4qi9hG7SEwWyEtGhtLJy_79YA2DDQN-3P-qFLOjL")' }}
                ></div>
                <div className={styles.avatarPlus}>+2k</div>
              </div>
              <div className={styles.joinText}>Join 10,000+ creators today</div>
            </div>
            
            {/* Features */}
            <div className={styles.features}>
              <span className={styles.feature}>
                <span className="material-symbols-outlined">check_circle</span> Free Forever
              </span>
              <span className={styles.feature}>
                <span className="material-symbols-outlined">check_circle</span> No Credit Card
              </span>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className={styles.loginCard}>
            <div className={styles.cardBlur}></div>
            
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Welcome Back</h2>
              <p className={styles.formSubtitle}>Enter your details to access your account.</p>
              
              <LoginForm />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.copyright}>
            © 2023 Nexus Inc. All rights reserved.
          </div>
          
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Help Center</a>
            <a href="#" className={styles.footerLink}>Privacy</a>
            <a href="#" className={styles.footerLink}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;