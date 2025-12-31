import React, { useContext, useEffect, useState } from 'react';
import styles from './css/EditProfilePage.module.css';
import { UserContext } from '../context/UserContext';
import { DotSpinner } from '../components/LoadingSpinner';
import { patchReq } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const { user, loading } = useContext(UserContext);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [childLoading, setChildLoading] = useState(false);

    const navigate = useNavigate();

    const setPrevData = () => {
        if (user) {
            setName(user?.user?.first_name || '');
            setUsername(user?.user?.username || '');
            setBio(user?.bio || '');
        }
    }

    useEffect(() => {
        setPrevData()
    }, [user])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setChildLoading(true);
        await patchReq(
            'user/profile/',
            {   
                user: {
                    first_name: name,
                    // username: username
                },

                bio: bio
            }
        )
        window.location.reload();
    } catch (err) {
        if (err.message == 401) {
            navigate('/login');
        }
        console.log(err.message)
    } finally {
        setChildLoading(false);
    }
  };

  const handleCancel = () => {
    setPrevData()
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <span className="material-symbols-outlined">grid_view</span>
            </div>
            <h1 className={styles.logoText}>Nexus</h1>
          </div>
          
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          {/* Back Button */}
          <div className={styles.backButton} onClick={() => {navigate(-1)}}>
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back to Profile</span>
          </div>

          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Edit Profile</h1>
            <p className={styles.pageSubtitle}>Update your personal details and public profile.</p>
          </div>

          {/* Profile Photo Section */}
          <div className={styles.sectionCard}>
            <div className={styles.profilePhotoSection}>
              <div className={styles.photoInfo}>
                <div className={styles.photoContainer}>
                  <div 
                    className={styles.profilePhoto}
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTMn2bplDH27QsNvksy6vqUZ4nSrEQEhBMxUlZqQUDVUrjI62Ctj1uddmDeY39_zQMrMgwUcvOAX3DRm-Xr6xeYyAQ70FjYf91JMikh4D7NHmWfkxGIIRnlzYJ_tGInn2ucvx3ygIdU9ioPxyZdO3uaCCzvKGxAX77yLeOgImm1JuzMKj__-0tpn5LN7Z6gOQd_Kxt3zoJ3GH7kQxgrbnQ7x0V3Rk7X6DlHyy4oVZp4KVQU8miLpIcjHEp61VX-_sLohq0Ozm6QY6K")' }}
                  ></div>
                  <div className={styles.photoOverlay}>
                    <span className="material-symbols-outlined">edit</span>
                  </div>
                </div>
                <div className={styles.photoDetails}>
                  <h3 className={styles.photoTitle}>Profile Photo</h3>
                  <p className={styles.photoDescription}>Accepts JPG, PNG or GIF (max 5MB)</p>
                </div>
              </div>
              <button className={styles.changePhotoButton}>
                Change Photo
              </button>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className={styles.formSection}>
            {loading || childLoading
            ?
            <DotSpinner />
            :
            <div className={styles.formCard}>
              {/* Name Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="name">Name</label>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.formInput}
                    id="name"
                    type="text"
                    placeholder="Enter your display name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                  />
                  <span className="material-symbols-outlined">id_card</span>
                </div>
              </div>

              {/* Username Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="username">Username</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.usernamePrefix}>@</span>
                  <input
                    className={`${styles.formInput} ${styles.usernameInput}`}
                    id="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                  />
                  <span className="material-symbols-outlined" title="Username available">check_circle</span>
                </div>
                {/* <p className={styles.helperText}>Your profile URL: nexus.com/@{formData.username}</p> */}
              </div>

              {/* Bio Field */}
              <div className={styles.formGroup}>
                <div className={styles.bioHeader}>
                  <label className={styles.formLabel} htmlFor="bio">Bio</label>
                  <span className={styles.charCount}>64/150</span>
                </div>
                <textarea
                  className={styles.formTextarea}
                  id="bio"
                  placeholder="Tell us a little about yourself..."
                  rows="4"
                  value={bio}
                  onChange={(e) => { setBio(e.target.value) }}
                />
              </div>
            </div>}

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className={styles.saveButton}>
                <span className="material-symbols-outlined">save</span>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfilePage;