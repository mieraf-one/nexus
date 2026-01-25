import { useNavigate } from 'react-router-dom';
import styles from '../../pages/css/ViewPostPage.module.css'

function Comments({ post }) {
    const navigate = useNavigate();
    
    const handleGoToCommentsProfile = (username) => {
        navigate(`/user/${username}`);
        return
    }

    return (
        <>
        {post?.comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentAvatar}>
                {comment?.author.profile_picture ? (
                    <div 
                    className={styles.avatarImage}
                    style={{ backgroundImage: `url(${comment.author.profile_picture})` }}
                    ></div>
                ) : (
                    <span className="material-symbols-outlined">person</span>
                )}
                </div>

                <div className={styles.commentMain}>

                <div className={styles.commentContent}>
                    <p className={styles.commentText}>
                    <span
                        className={styles.commentAuthor}
                        onClick={() => {handleGoToCommentsProfile(comment?.author.username)}}
                    >
                        {comment?.author.username}
                    </span>
                    {comment.content}
                    </p>
                    <div className={styles.commentActions}>
                    <span className={styles.commentTime}>{comment.created_at}</span>
                    <button className={styles.replyButton}>Reply</button>
                    </div>
                </div>

                <div className={styles.likeSection}>
                    <button 
                        className={`${styles.likeButton} ${comment.isLiked ? styles.liked : ''}`}
                        onClick={() => {
                            // In a real app, you would update this in state
                            console.log('Toggle like for comment:', comment.id);
                        }}
                    >
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                    </button>
                    <span className={styles.likeCount}>{comment.likes}</span>
                </div>
                </div>
            </div>
        ))}
        </>
    )
}


export default Comments;