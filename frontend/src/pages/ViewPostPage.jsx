import React, { useState, useRef, useEffect, useActionState, useContext } from 'react';
import styles from './css/ViewPostPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getReq, postReq, properDate } from '../utils/utils';
import path from '../utils/apiEndPoints';
import { DotSpinner } from '../components/LoadingSpinner';
import ImageSection from '../components/ViewPostPage/ImageSection';
import UserHeader from '../components/ViewPostPage/UserHeader';
import Comments from '../components/ViewPostPage/Comments';
import BottomSection from '../components/ViewPostPage/BottomSection';
import { AuthContext } from '../context/AuthContext';

const ViewPostPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const { logout } = useContext(AuthContext);

  const commentsRef = useRef(null);
  const modalRef = useRef(null);
  
  const { id } = useParams();

  const navigate = useNavigate();

  // Check if mobile on mount and resize
  useEffect(() => {
    const fetchComments = async () => {
      try {
          setLoading(true);
          const post = await getReq(path.post(id));
          console.log(post);
          setPost(post);
      } catch (error) {
        console.log(error.message);

        if (error.code == 401) {
          logout;
          navigate('/login');
          return;
        }

      } finally {
        setLoading(false);
      }
    }

    fetchComments();

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLikeState = () => {
    setPost(prev => ({
      ...prev,
      is_liked: !prev.is_liked,
      likes_count: prev.is_liked
        ? prev.likes_count - 1
        : prev.likes_count + 1
    }))
  }

  const handleCommentState = (newComment) => {
      setPost(prev => ({
        ...prev,
        comments: [
          ...prev.comments,
          newComment
        ]
      }));
  }

  // Auto-scroll to comments on mobile when modal opens
  // useEffect(() => {
  //   if (isMobile && commentsRef.current) {
  //     setTimeout(() => {
  //       commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  //     }, 100);
  //   }
  // }, [isMobile]);

  if (loading) { return <DotSpinner /> }

  return (
    <div className={`${styles.container} ${styles.light}`}>
      <div className={styles.modal} ref={modalRef}>
        {/* Mobile close button */}
        <button 
          className={styles.mobileCloseButton}
          onClick={() => {navigate(-1)}}
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Left side - Post image (top on mobile) */}
        <ImageSection photo={post?.photo} />

        {/* Right side - Comments section (scrollable) */}
        <div className={styles.commentsSection} ref={commentsRef}>
          {/* User header */}
          <UserHeader post={post} setPost={setPost} />
        

          {/* Scrollable comments list */}
          <div className={styles.commentsListContainer}>
            <div className={styles.commentsList}>
              {/* Original post */}
              {/* <div className={styles.commentItem}>
                <div 
                  className={styles.commentAvatar}
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhhvWt8zuVNDXoW2G8ub1GwHtMd0Jh7m25nxgdz8-oPy4A16qKll5iWpj9rvubffO6dd5cO4s04jM5PkdGs6XlpyNSlRTWDi_WnlkGzTIM5LP9okkqiANhCKD5fiONym4w2cJJ8ZwI91E6Pq5qjRHKYqriV_OtQNwnCjoo5k_BxAtHeVftcAMfe66Km5XHqjGFGqBrY4hZUYvz7gQEY22QicyUlOLQtgP2TPhmnGcM6Y-BS04KqZOe7iGstteQ9Crbgx46TFYyl0x4")'
                  }}
                ></div>
                <div className={styles.commentContent}>
                  <p className={styles.commentText}>
                    <span className={styles.commentAuthor}>Alex Rivera</span>
                    Exploring the new horizons of digital creation. The future is bright at Nexus! ✨ #innovation #design #nexus
                  </p>
                  <p className={styles.commentTime}>2 hours ago</p>
                </div>
              </div> */}

              {/* User comments */}
              < Comments post={post} />
            </div>
          </div>

          {/* Fixed bottom actions and comment input */}
          <BottomSection post={post} setLikesCount={handleLikeState} setComment={handleCommentState} />
          
        </div>
      </div>

      {/* Theme toggle (outside modal)
      <button className={styles.themeToggle} onClick={toggleTheme}>
        <span className="material-symbols-outlined">
          {isDarkMode ? 'light_mode' : 'dark_mode'}
        </span>
      </button> */}
    </div>
  );
};

export default ViewPostPage;