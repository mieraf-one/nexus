import React, { useEffect, useState } from 'react';
import styles from './Css/FollowingModal.module.css';
import { getReq } from '../utils/utils';
import path from '../utils/apiEndPoints';
import { Link, useParams } from 'react-router-dom';

const FollowingModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [following, setFollowing] = useState([]);
  const { username } = useParams();

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const res = await getReq(path.profile(username));
                // console.log(res.following);
                setFollowing(res.following);
            } catch (err) {
                
            }
        }
        
        fetchFollowing();
    }, [])

  const handleUnfollow = (id) => {
    setFollowing(following.filter(user => user.id !== id));
  };

  const filteredFollowing = following.filter(user =>
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
                Following <span className={styles.count}>{following?.length}</span>
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
                placeholder="Search following..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Scrollable List Content */}
          <div className={styles.listContainer}>
            {filteredFollowing.map((user) => (
              <Link
                  key={user.id}
                  to={`/user/${user.username}`}
                  onClick={onClose}
                  className={styles.listItem}
                  style={{textDecoration: 'none'}}
              >
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
                  className={styles.followButton}
                  onClick={() => handleUnfollow(user.id)}
                >
                  <span className={styles.followText}>Following</span>
                  <span className={styles.unfollowText}>Unfollow</span>
                </button>
              </Link>
            ))}
          </div>

          {/* Modal Footer Gradient */}
          <div className={styles.modalFooter}></div>
        </div>
      </div>
    </>
  );
};

export default FollowingModal;