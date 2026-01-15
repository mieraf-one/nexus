import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './css/EditProfilePage.module.css';
import { UserContext } from '../context/UserContext';
import { DotSpinner } from '../components/LoadingSpinner';
import { patchReq, uploadToCloudinary } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import path from '../utils/apiEndPoints';

const EditProfilePage = () => {
    const { user, loading } = useContext(UserContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [childLoading, setChildLoading] = useState(false);

    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const setPrevData = () => {
      console.log(user);
        if (user) {
            setFirstName(user?.first_name || '');
            setLastName(user?.last_name || '');
            setUsername(user?.username || '');
            setEmail(user?.email || '');
            setBio(user?.bio || '');
            setProfilePic(user?.profile_picture)
        }
    }

    useEffect(() => {
        setPrevData()
    }, [user])


  const handleImage = async (e) => {
    try {
      const secure_link = await uploadToCloudinary(e.target.files[0]);
      const res = await patchReq(
        path.profile(),
        {
          profile_picture: secure_link
        }
      )
      console.log(res)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setChildLoading(true);
        await patchReq(
            path.profile(),
            {   
                first_name: firstName,
                last_name: lastName,
                username,
                email,
                bio
            }
        )
        // window.location.reload();
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
                <label
                    className={styles.photoContainer}
                >
                  <input
                    ref={fileInputRef}
                    className={styles.changePhotoButton}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {handleImage(e);}}
                    hidden
                  />

                  <div 
                    className={styles.profilePhoto}
                    style={{ backgroundImage: `url(${profilePic})` }}
                  ></div>
                  <div className={styles.photoOverlay}>
                    <span className="material-symbols-outlined">edit</span>
                  </div>
                </label>
                <div className={styles.photoDetails}>
                  <h3 className={styles.photoTitle}>Profile Photo</h3>
                  <p className={styles.photoDescription}>Accepts JPG, PNG or GIF (max 5MB)</p>
                </div>
              </div>
              <button
                  className={styles.changePhotoButton}
                  onClick={() => fileInputRef.current.click()}>
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
              {/* First Name Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="first-name">First Name</label>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.formInput}
                    id="first-name"
                    type="text"
                    placeholder="Enter your First name"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value) }}
                  />
                  {/* <span className="material-symbols-outlined">id_card</span> */}
                </div>
              </div>

              {/* Last Name Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="last-name">Last Name</label>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.formInput}
                    id="last-name"
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }}
                  />
                  {/* <span className="material-symbols-outlined">id_card</span> */}
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
                  {/* <span className="material-symbols-outlined" title="Username available">check_circle</span> */}
                </div>
                {/* <p className={styles.helperText}>Your profile URL: nexus.com/@{formData.username}</p> */}
              </div>
              
              {/* Email Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="email">Email</label>
                <div className={styles.inputWrapper}>
                  <input
                    className={`${styles.formInput} ${styles.usernameInput}`}
                    id="email"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                  {/* <span className="material-symbols-outlined" title="Username available">check_circle</span> */}
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