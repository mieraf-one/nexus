import React, { useState, useEffect } from 'react';
import styles from '../Css/FollowersModal.module.css';
import { getReq } from '../../utils/utils';
import { useNavigate, useParams } from 'react-router-dom';
import path from '../../utils/apiEndPoints';
import { DotSpinner } from '../LoadingSpinner';

const FollowersModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { username } = useParams();

   useEffect(() => {
      const fetchFollowing = async () => {
        try {
            setLoading(true);

            const res = await getReq(path.userFollowers(username));
            //  console.log(res);
            setFollowers(res.follower);
        } catch (err) {
            console.log(err.message)
        } finally {
          setLoading(false);
        }
    }
    
    fetchFollowing();
    
  }, [username])

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
  
  if (loading) <DotSpinner />
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
                <div
                  key={user.id}
                  className={styles.listItem}
                >
                  <div
                    className={styles.userInfo}
                    onClick={() => { onClose(); navigate(`/user/${user.username}`)}}
                    style={{ cursor: 'pointer' }}
                  >
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

                  {/* Remove button does NOT trigger navigation */}
                  <button
                    className={styles.removeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(user.id);
                    }}
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