import { useState } from 'react';
import styles from '../../pages/css/ViewPostPage.module.css'
import { postReq } from '../../utils/utils';
import path from '../../utils/apiEndPoints';

function BottomSection({ post, setLikesCount, setComment }) {
    const [newComment, setNewComment] = useState('');

    const handlePostComment = async (id) => {
        if (newComment.trim()) {
        try {
            const res = await postReq(
                path.comments(id),
                {content: newComment}
            )
            console.log(res);
            setComment(res);
            
        } catch (error) {
            console.log(error.message);
        }

        setNewComment('');
        }
    };

  const handleLikesCount = async (id) => {
    try {
        await postReq(path.likePost(id));
        setLikesCount();
    } catch (error) {
        console.log(error.message);
    }
  }

    return (
        <div className={styles.bottomSection}>
            <div className={styles.postActions}>
                <div className={styles.actionButtons}>
                <button 
                    className={`${styles.actionButton} ${post?.is_liked ? styles.liked : ''}`}
                    onClick={() => {handleLikesCount(post?.id)}}
                >
                    <span className="material-symbols-outlined">
                        {post?.is_liked ? 'favorite' : 'favorite_border'}
                    </span>
                </button>
                {/* <button className={styles.actionButton}>
                    <span className="material-symbols-outlined">chat_bubble</span>
                </button> */}
                <button className={styles.actionButton}>
                    <span className="material-symbols-outlined">send</span>
                </button>
                </div>
                <button 
                className={`${styles.actionButton}`}
                >
                <span className="material-symbols-outlined">bookmark</span>
                </button>
            </div>

            <div className={styles.postStats}>
                <p className={styles.likeCountTotal}>{post?.likes_count} likes</p>
                {/* <p className={styles.postDate}>{post?.edited_at}</p> */}
            </div>

            <div className={styles.commentInputContainer}>
                <div className={styles.commentInputWrapper}>
                <button className={styles.emojiButton}>
                    <span className="material-symbols-outlined">sentiment_satisfied</span>
                </button>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className={styles.commentInput}
                />
                <button 
                    className={styles.postButton}
                    onClick={() => {handlePostComment(post?.id)}}
                    // disabled={!newComment.trim()}
                >
                    Post
                </button>
                </div>
            </div>
        </div>
    )
};


export default BottomSection;
