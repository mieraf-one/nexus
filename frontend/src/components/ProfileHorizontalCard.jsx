import React, { useState } from 'react';
import styles from './Css/ProfileHorizontalCard.module.css';
import { useEffect } from 'react';
import { getReq, postReq } from '../utils/utils';
import { DotSpinner } from './LoadingSpinner';
import path from '../utils/apiEndPoints';
import { useNavigate } from 'react-router-dom';

const ProfileHorizontalCard = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const [suggestAccounts, setSuggestAccounts] = useState([
    {
      id: 1,
      name: "Sarah Jenks",
      username: "@sarahj_design",
      description: "Followed by miker_legal",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0joO45KH-JczFrxUoj9CYCGz5298FP-ei_cCgDXIQVQxpTwbMFzzvM5Go7fh2jMnd2Zjr_GfTH_hbUXjs4abauYDdqnf9_I-hdQJ-Z3CzA1YmQq0yoz4thz8rbu2eZyI53Jm11Ek6UJ0k5sEd-TQWvyItYwo-jUKvXSluSOFDChKLAlG33bCflfbfJ6JuTFlabz5Ro9gcl3cFX7w95xcd5YON8BHIB6VQHGEKvY0z2ow4si09qSL1Fb7kVfuB8Fe0LgzUU5kIMwwb",
      isFollowing: false,
      isOnline: true
    }
  ]);

  const avatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuB0joO45KH-JczFrxUoj9CYCGz5298FP-ei_cCgDXIQVQxpTwbMFzzvM5Go7fh2jMnd2Zjr_GfTH_hbUXjs4abauYDdqnf9_I-hdQJ-Z3CzA1YmQq0yoz4thz8rbu2eZyI53Jm11Ek6UJ0k5sEd-TQWvyItYwo-jUKvXSluSOFDChKLAlG33bCflfbfJ6JuTFlabz5Ro9gcl3cFX7w95xcd5YON8BHIB6VQHGEKvY0z2ow4si09qSL1Fb7kVfuB8Fe0LgzUU5kIMwwb";


  const handleRemove = (id) => {
    setCards(suggestAccounts.filter(user => user.id !== id));
  };

  useEffect(() => {
      const fetchSuggestions = async () => {
        try {
          setLoading(true);
        const res = await getReq('follow-suggestions/');
        console.log(res.results)
        setSuggestAccounts(res.results);
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      }
  
      fetchSuggestions();
      
    }, [])

    const followUser = async (id) => {
        try {
          const res = await postReq(path.followUser(id), {})
    
          setSuggestAccounts(suggestAccounts.map((user) => {
            if (user.id == id) {
              return {...user, is_following: !user.is_following};
            }
            return user;
            
          }))
        } catch (err) {
          console.log(err.message)
        }
      }
    
      const unFollowUser = async (id) => {
        try {
          const res = await postReq(`user/unfollow/${id}/`, {});
    
          setSuggestAccounts(suggestAccounts.map((user) => {
            if (user.id == id) {
              return {...user, is_following: !user.is_following};
            }
            return user;
    
          }))
        } catch (err) {
          console.log(err.message)
        }
      }

  if (suggestAccounts.length == 0) return null;
  return (
    <>
    {loading
        ?
    <DotSpinner />
        :
    <>
    <div className={styles.simpleHeader}>
      <h2 className={styles.simpleTitle}>Suggestions For You</h2>
      <p className={styles.simpleSubtitle}>Accounts you might like</p>
    </div>
    <div className={styles.horizontalContainer}>
      {/* Blur gradients for scroll indication */}
      <div className={styles.leftGradient}></div>
      <div className={styles.rightGradient}></div>
      
      {/* Scroll Area */}
      <div className={styles.scrollArea}>
        {suggestAccounts.map((user) => (
          <div 
              key={user.id}
              className={styles.card}
              onClick={() => {navigate(`/user/${user.username}/`)}}
            >
            {/* Close Button */}
            <button 
              className={styles.closeButton}
              onClick={() => handleRemove(user.id)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            {/* Avatar */}
            <div className={styles.avatarContainer}>
              <div 
                className={styles.avatar}
                style={{ backgroundImage: `url("${avatar}")` }}
              ></div>
            </div>
            
            {/* User Info */}
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>{user.first_name}</h3>
              <p className={styles.userUsername}>@{user.username}</p>
            </div>
            
            {/* Follow Button */}
            <button 
              className={`${styles.followButton} ${user.is_following ? styles.following : ''}`}
              onClick={(e) => {e.stopPropagation(); user.is_following ? unFollowUser(user.id) : followUser(user.id)}}
            >
              {user.is_following ? (
                <>
                  <span className="material-symbols-outlined">check</span>
                  <span>Following</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">add</span>
                  <span>Follow</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
    
    }
    
    </>
  );
};

export default ProfileHorizontalCard;