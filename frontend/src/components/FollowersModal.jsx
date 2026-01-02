import React, { useState } from 'react';
import styles from './Css/FollowersModal.module.css';
import { useEffect } from 'react';
import { getReq } from '../utils/utils';

const FollowersModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [followers, setFollowers] = useState([]);


   useEffect(() => {
           const fetchFollowing = async () => {
               try {
                   const res = await getReq('user/profile/');
                   console.log(res.follower);
                   setFollowers(res.follower);
               } catch (err) {
                   
               }
           }
           
           fetchFollowing();
       }, [])

  const handleRemove = (id) => {
    setFollowers(followers.filter(user => user.id !== id));
  };

  const filteredFollowers = followers.filter(user =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  

  return (
    <>
      {/* Mock Background Blur */}
      <div className={styles.mockBackground}>
        <div className={styles.backgroundGradient}></div>
        <div className={styles.profileMock}>
          <div className={styles.mockAvatar}></div>
        </div>
        <div className={styles.contentMock}>
          <div className={styles.mockText1}></div>
          <div className={styles.mockText2}></div>
        </div>
      </div>

      {/* Modal Overlay */}
      <div className={styles.overlay} onClick={handleBackgroundClick}>
        {/* Modal Container */}
        <div className={styles.modalContainer}>
          {/* Modal Header */}
          <div className={styles.modalHeader}>
            <div className={styles.headerContent}>
              <h2 className={styles.modalTitle}>
                Followers <span className={styles.count}>{followers?.length}</span>
              </h2>
              <button 
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className={styles.searchContainer}>
              <div className={styles.searchIcon}>
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search followers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Scrollable List Content */}
          <div className={styles.listContainer}>
            {filteredFollowers.map((user) => (
              <div key={user.id} className={styles.listItem}>
                <div className={styles.userInfo}>
                  <div className={styles.avatarContainer}>
                    {user.avatar ? (
                      <div 
                        className={styles.avatar} 
                        style={{ backgroundImage: `url("${user.avatar}")` }}
                      ></div>
                    ) : (
                      <div className={`${styles.avatar} ${styles.brandAvatar}`}>
                        <span className="material-symbols-outlined">rocket_launch</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.userDetails}>
                    <div className={styles.nameContainer}>
                      <span className={styles.userName}>{user.first_name}</span>
                      {user.verified && (
                        <span className={styles.verifiedIcon} title="Verified">
                          <span className="material-symbols-outlined">verified</span>
                        </span>
                      )}
                    </div>
                    <span className={styles.userUsername}>{user.username}</span>
                  </div>
                </div>
                <button 
                  className={styles.removeButton}
                  onClick={() => handleRemove(user.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Modal Footer Gradient */}
          <div className={styles.modalFooter}></div>
        </div>
      </div>
    </>
  );
};

export default FollowersModal;