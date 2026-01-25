import React, { useContext, useState } from 'react';
import styles from './css/CreatePostPage.module.css';
import { postReq, uploadToCloudinary } from '../utils/utils';
import path from '../utils/apiEndPoints';
import { AuthContext } from '../context/AuthContext';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { logout } = useContext(AuthContext);

  const maxCaptionLength = 500;

  const handleCaptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxCaptionLength) {
      setCaption(value);
    }
  };

  const handleFileUpload = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const handlePost = async () => {
    
    try {
        const secure_url = await uploadToCloudinary(file)

        await postReq(
            path.posts,
            {
                photo: secure_url,
                caption
            }
        )

    } catch (error) {
        console.log(error.message);
        if (error.code == 401) {
          logout;
        }
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles.layoutContainer}>
        {/* Top Navigation Bar */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.logoSection}>
              <div className={styles.logoIcon}>
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2 className={styles.logoText}>Nexus</h2>
            </div>
            
            <div className={styles.searchContainer}>
              <div className={styles.searchIcon}>
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                type="text" 
                className={styles.searchInput}
                placeholder="Search Nexus"
              />
            </div>
          </div>

          <div className={styles.headerRight}>
            <nav className={styles.navLinks}>
              <a href="#" className={styles.navLink}>Home</a>
              <a href="#" className={styles.navLink}>Explore</a>
              <a href="#" className={styles.navLink}>Messages</a>
              <a href="#" className={styles.navLink}>Profile</a>
            </nav>
            
            <div className={styles.divider}></div>
            
            <button onClick={toggleDarkMode} className={styles.themeToggle}>
              <span className="material-symbols-outlined">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            
            <div 
              className={styles.userAvatar}
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBA315OBHXXqF7SD79PCwakkERv2xkhcRNlk85gJab1fheMmJt_rJ-zJ78EMLeq4Wz1M1K2W2kBhdxeIaNyqa5DgCxvw-WWM8mxrCHXd3DLxlCQGyjL0VUa0eDnA6C7KOC2CCq0P_eXHHkH_Sa_xTIt--d5D2BBIXWpBemq-ah_3yHln-VxtCBouoGXUbs7sLBpuJ5XqpqWmvAQll1k2EWiw_2pJtw6xZgmR5uozLHyUAkPr1_CGW28MqIVJxeE1WTi7M95Lap4jdm5")'
              }}
            ></div>
          </div>
        </header>

        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.contentWrapper}>
            {/* Headline Section */}
            <div className={styles.headline}>
              <h1 className={styles.headlineTitle}>Create New Post</h1>
              <p className={styles.headlineSubtitle}>Share your latest moments with your community</p>
            </div>

            {/* Post Creation Card */}
            <div className={styles.postCard}>
              {/* Left Side: Media Upload */}
              <div className={styles.mediaSection}>
                <div className={styles.mediaHeader}>
                  <h3 className={styles.sectionTitle}>Media</h3>
                  <span className={styles.qualityBadge}>High Quality</span>
                </div>

                {/* Dropzone */}
                <div className={styles.dropzone}>
                  <input 
                    type="file" 
                    id="file-upload"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className={styles.fileInput}
                  />
                  <label htmlFor="file-upload" className={styles.dropzoneContent}>
                    <div className={styles.uploadIcon}>
                      <span className="material-symbols-outlined">add_photo_alternate</span>
                    </div>
                    <h4 className={styles.dropzoneTitle}>Drag and drop photos here</h4>
                    <p className={styles.dropzoneSubtitle}>Support JPG, and PNG up to 2MB</p>
                    <button type="button" className={styles.browseButton}>
                      Browse Files
                    </button>
                  </label>
                </div>

                {/* Image Thumbnails Grid */}
                <div className={styles.thumbnailsGrid}>
                  {[1, 2, 3].map((item) => (
                    <div 
                      key={item}
                      className={styles.thumbnailPlaceholder}
                      style={{
                        backgroundImage: `url(${file ? URL.createObjectURL(file) : ''})`,
                        backgroundSize: 'cover'  
                      }}  
                    >
                      <span className="material-symbols-outlined">image</span>
                    </div>
                  ))}
                  <div className={styles.addThumbnail}>
                    <span className="material-symbols-outlined">add</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Composer & Metadata */}
              <div className={styles.composerSection}>
                {/* User Header */}
                <div className={styles.userHeader}>
                  <div 
                    className={styles.userAvatarSmall}
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhhvWt8zuVNDXoW2G8ub1GwHtMd0Jh7m25nxgdz8-oPy4A16qKll5iWpj9rvubffO6dd5cO4s04jM5PkdGs6XlpyNSlRTWDi_WnlkGzTIM5LP9okkqiANhCKD5fiONym4w2cJJ8ZwI91E6Pq5qjRHKYqriV_OtQNwnCjoo5k_BxAtHeVftcAMfe66Km5XHqjGFGqBrY4hZUYvz7gQEY22QicyUlOLQtgP2TPhmnGcM6Y-BS04KqZOe7iGstteQ9Crbgx46TFYyl0x4")'
                    }}
                  ></div>
                  <div>
                    <p className={styles.userName}>Alex Rivera</p>
                    <button className={styles.privacyButton}>
                      <span className="material-symbols-outlined">public</span>
                      <span>Public Post</span>
                      <span className="material-symbols-outlined">expand_more</span>
                    </button>
                  </div>
                </div>

                {/* Caption Composer */}
                <div className={styles.captionSection}>
                  <label className={styles.sectionTitle}>Caption</label>
                  <div className={styles.textareaContainer}>
                    <textarea
                      value={caption}
                      onChange={handleCaptionChange}
                      placeholder="What's on your mind?"
                      className={styles.captionTextarea}
                      rows="6"
                    />
                    <div className={styles.textareaFooter}>
                      <div className={styles.formattingButtons}>
                        <button className={styles.formatButton}>
                          <span className="material-symbols-outlined">sentiment_satisfied</span>
                        </button>
                        <button className={styles.formatButton}>
                          <span className="material-symbols-outlined">alternate_email</span>
                        </button>
                        <button className={styles.formatButton}>
                          <span className="material-symbols-outlined">tag</span>
                        </button>
                      </div>
                      <span className={styles.charCount}>
                        {caption.length} / {maxCaptionLength}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post Details Sections */}
                <div className={styles.detailsSection}>
                  {/* Location */}
                  <button className={styles.detailButton}>
                    <div className={styles.detailContent}>
                      <div className={styles.detailIcon}>
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                      <div>
                        <p className={styles.detailTitle}>Add Location</p>
                        <p className={styles.detailSubtitle}>Where was this taken?</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>

                  {/* Tag People */}
                  <button className={styles.detailButton}>
                    <div className={styles.detailContent}>
                      <div className={styles.detailIcon}>
                        <span className="material-symbols-outlined">person_add</span>
                      </div>
                      <div>
                        <p className={styles.detailTitle}>Tag People</p>
                        <p className={styles.detailSubtitle}>Involve your friends</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>

                {/* Action Footer */}
                <div className={styles.actionFooter}>
                  <button className={styles.cancelButton}>
                    Cancel
                  </button>
                  
                  <button 
                    className={styles.submitButton}
                    onClick={handlePost}
                  >
                    <span>Share Post</span>
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Settings Link */}
            <div className={styles.advancedSettings}>
              <button className={styles.settingsButton}>
                <span>Advanced Settings</span>
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2024 Nexus Social. Modern communication redefined.</p>
        </footer>
      </div>
    </div>
  );
};

export default CreatePost;