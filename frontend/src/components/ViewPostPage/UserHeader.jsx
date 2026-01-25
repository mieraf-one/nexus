import { useNavigate } from 'react-router-dom';
import styles from '../../pages/css/ViewPostPage.module.css'
import { followUser, properDate } from '../../utils/utils';


function UserHeader({ post, setPost }) {
    const navigate = useNavigate();

    const handleGoToProfile = (userUsername) => {
        navigate(`/user/${userUsername}`);
        return
    }

    const handleFollow = async (id) => {    
          try {
    
            setPost(prev => ({
              ...prev,
              author: {
                ...prev.author,
                is_following: !prev.author.is_following
                }
            }));

              await followUser(id);
    
          } catch (error) {
            console.log(error.message);
          }
        }
    

    return (
        <div className={styles.userHeader}>
            <div className={styles.userInfo}>
                <div 
                className={styles.userAvatar}
                style={{
                    backgroundImage: `url(${post?.author.profile_picture})`
                }}
                onClick={() => {handleGoToProfile(post?.author.username)}}
                ></div>
                <div className={styles.userDetails}>
                <div className={styles.userNameRow}>
                    <h3
                        className={styles.userName}
                        onClick={() => {handleGoToProfile(post?.author.username)}}
                    >
                        {post?.author.username}
                    </h3>

                    {!post?.author.is_following
                        &&
                    <button
                        className={styles.followButton}
                        onClick={() => {handleFollow(post?.author.id);}}
                    >Follow</button>}

                </div>
                <p className={styles.postCaption}>
                    {post?.caption}
                </p>
                <div className={styles.postMeta}>
                    <span className={styles.postTime}>{properDate(post?.edited_at)} hours ago</span>
                    <span className={styles.metaDot}>•</span>
                    <span className={styles.commentCount}>{post?.comments_count} comments</span>
                    {/* <span className={styles.metaDot}>•</span> */}
                    {/* <span className={styles.likeCountHeader}>{post?.likes_count} likes</span> */}
                </div>
                </div>
            </div>
            <div className={styles.headerActions}>
                {/* <button className={styles.actionButton}>
                <span className="material-symbols-outlined">more_horiz</span>
                </button> */}
                <button 
                className={styles.closeButton}
                onClick={() => {navigate(-1);}}
                >
                <span className="material-symbols-outlined">close</span>
                </button>
            </div>
        </div>
    )
};

export default UserHeader;
