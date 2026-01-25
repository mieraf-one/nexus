import { useContext, useEffect, useState } from "react";
import styles from "../../pages/css/DashboardPage.module.css"
import { getReq, postReq } from "../../utils/utils";
import path from "../../utils/apiEndPoints";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const MainContent = () => {
  const [posts, setPosts] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getReq(
        path.posts
        )

        setPosts(res);
        console.log(res);

      } catch (error) {
        if (error.code == 401) {
          logout;
          navigate('/login');
          return;
        }
      }
    }

    fetchPosts();
  }, [])

  const handleLike = async (postId) => {
    const prevState = [...posts]

    try {
      setPosts(prev => prev.map((post) => {

        if (post.id == postId) {
          return {
            ...post,
            is_liked: !post.is_liked,
            likes_count: post.is_liked
              ? post.likes_count - 1
              : post.likes_count + 1}  
        }

        return post;
      }))
      await postReq(
        path.likePost(postId)
      )
    } catch (error) {
      console.log(error.message);
      setPosts(prevState)

      if (error.code == 401) {
          logout;
          navigate('/login');
          return;
      }
    }
  }

  const stories = [
    { name: 'Your Story', image: null, isAdd: true },
    { name: 'James', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc")', hasBorder: true },
    { name: 'Sarah W.', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCAvytpHetbHBoclqocctShLueN0d3j1vLCCILREkyMzOLXw9e5auSU6C6KoAjoQ2RDfwPu_2Bz6AF5hswBmDaiWEhs4YWbqSiRostSwEYvn_Y0E3FJYNO4yFegf-hzyglelo9Fud_Ck0lSLrw7f10Dk82uT4A_LJrL3WBfxT1285e-0ljpmVhW59dduWOmxRWfsd2HJA7qBMQwYEKWRBeUIf7R8UoQREBSS3a4qi9hG7SEwWyEtGhtLJy_79YA2DDQN-3P-qFLOjL")', hasBorder: true },
    { name: 'Mike T.', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlq1M1MGGt0eKcXODBfGkPcBawBYu_18UZ6biXFlrQdmyXE5CClkjDPWPleIldHb5suWVDhtEQP5I2GQH_QOPW7DmtYS7IyCuhA5NkH-TFFpA6eB7_CIB_hWJVCnUjyQ2vCN84ugMttKwojgInPjWcE1zVWnZbNLlDnFgyUydW8wc_WJuPwM_fRa2Zx6T17hVoAkB3UbY7Hn8GCW3Upv7NnA_PpVn-e_RL3hefEHjMs_WUpMqEqwytRlKuJCgHtkmhIC5Ahfp05WMr")', hasBorder: false },
    { name: 'James W.', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc")', hasBorder: false }
  ];

  return (
    <section className={styles.mainContent}>
      {/* <div className={styles.storiesCard}>
        <div className={styles.storiesHeader}>
          <h3 className={styles.storiesTitle}>Stories</h3>
          <button className={styles.seeAllBtn}>See all</button>
        </div>
        <div className={styles.storiesContainer}>
          {stories.map((story, index) => (
            <div key={index} className={styles.storyItem}>
              <div className={`${styles.storyCircle} ${story.isAdd ? styles.addStory : story.hasBorder ? styles.gradientBorder : styles.normalBorder}`}>
                <div className={styles.storyInner}>
                  {story.isAdd ? (
                    <span className="material-symbols-outlined">add</span>
                  ) : (
                    <div className={styles.storyImage} style={{ backgroundImage: story.image }} />
                  )}
                </div>
              </div>
              <span className={styles.storyName}>{story.name}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Post 1 */}
      {posts.map((post) => (
        <article
          key={post.id} 
          className={styles.postCard}
          onClick={() => {navigate(`/post/${post.id}`)}}
        >
        <div className={styles.postHeader}>
          <div className={styles.postAuthor}>
            <div 
              className={styles.authorAvatar}
              style={{ backgroundImage: `url(${post.author.profile_picture})` }}
            />
            <div>
              <Link 
                to={`/user/${post.author.username}`}
                style={{
                  textDecoration: 'none',
                }}
                onClick={(e) => {e.stopPropagation();}}
              >
                <h4 className={styles.authorName}>{post.author.username}</h4>
              </Link>
              <p className={styles.postMeta}>{post.edited_at} hours ago</p>
            </div>
          </div>
          <button className={styles.postOptions}>
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
        
        <div className={styles.postContent}>
          <p className={styles.postText}>
            {post.caption} 
            {/* <span className={styles.hashtag}> #OfficeLife #Productivity #NewBeginnings</span> */}
          </p>
        </div>
        
        <div className={styles.postMedia}>
          <div 
            className={styles.mediaImage}
            style={{ backgroundImage: `url(${post.photo})` }}
          />
        </div>
        
        <div className={styles.postFooter}>
          <div className={styles.postActions}>
            <div className={styles.actionButtons}>
             <button
                className={`${styles.actionBtn} ${post.is_liked ? styles.liked : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(post.id);
                }}
              >
                <span className="material-symbols-outlined">
                  {post.is_liked ? 'favorite' : 'favorite_border'}
                </span>
                <span className={styles.actionCount}>{post.likes_count}</span>
              </button>


              <button className={`${styles.actionBtn} ${styles.commentBtn}`}>
                <span className="material-symbols-outlined">chat_bubble</span>
                <span className={styles.actionCount}>{post.comments_count}</span>
              </button>
              {/* <button className={`${styles.actionBtn} ${styles.shareBtn}`}>
                <span className="material-symbols-outlined">send</span>
              </button> */}
            </div>
            {/* <button className={styles.bookmarkBtn}>
              <span className="material-symbols-outlined">bookmark</span>
            </button> */}
          </div>
          
          {/* <div className={styles.postLikes}>
            <div className={styles.likedByAvatars}>
              <div 
                className={styles.likedAvatar}
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCAvytpHetbHBoclqocctShLueN0d3j1vLCCILREkyMzOLXw9e5auSU6C6KoAjoQ2RDfwPu_2Bz6AF5hswBmDaiWEhs4YWbqSiRostSwEYvn_Y0E3FJYNO4yFegf-hzyglelo9Fud_Ck0lSLrw7f10Dk82uT4A_LJrL3WBfxT1285e-0ljpmVhW59dduWOmxRWfsd2HJA7qBMQwYEKWRBeUIf7R8UoQREBSS3a4qi9hG7SEwWyEtGhtLJy_79YA2DDQN-3P-qFLOjL")' }}
              />
              <div 
                className={styles.likedAvatar}
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlq1M1MGGt0eKcXODBfGkPcBawBYu_18UZ6biXFlrQdmyXE5CClkjDPWPleIldHb5suWVDhtEQP5I2GQH_QOPW7DmtYS7IyCuhA5NkH-TFFpA6eB7_CIB_hWJVCnUjyQ2vCN84ugMttKwojgInPjWcE1zVWnZbNLlDnFgyUydW8wc_WJuPwM_fRa2Zx6T17hVoAkB3UbY7Hn8GCW3Upv7NnA_PpVn-e_RL3hefEHjMs_WUpMqEqwytRlKuJCgHtkmhIC5Ahfp05WMr")' }}
              />
            </div>
            <p className={styles.likesText}>
              Liked by <span className={styles.likedName}>Sarah W.</span> and <span className={styles.likedName}>thousands of others</span>
            </p>
          </div> */}
          
          <div className={styles.postComments}>
            {/* <div className={styles.commentItem}>
              <span className={styles.commentAuthor}>Sarah W.</span>
              <span className={styles.commentText}>Looks amazing! Can't wait to visit.</span>
            </div> */}
            <div className={styles.viewComments}>View all 84 comments</div>
          </div>
          
          {/* <div className={styles.addComment}>
            <div 
              className={styles.commentAvatar}
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFniLr9qQ4CyMr7gt_qH24PZq4DIBiAoXewcG0PV1tilRCyEE5kMENVO3PA-BDYFeOKp7kX8wLfwEJ7ZRaCM6Ud8MX5XZDJq6NEABH8fIRUGzXPC6ZeahQeSXt3Oa6rC6shhdl7b_wCOM-H3QW55eMINzf5nKVUeAU7LLFct__MMyEYJU2RHCLjJyBt7W67fYv2aDn3cgLs6PH2aZp-ZMtuDpkiGGAzqykfmuNHuzPHu9tTsS8fRgCCkt0wyDv4Dqny52Kj7EZpN3y")' }}
            />
            <input 
              type="text" 
              className={styles.commentInput}
              placeholder="Add a comment..."
            />
          </div> */}
        </div>
      </article>

      ))}
      
      {/* Post 2
      <article className={styles.postCard}>
        <div className={styles.postHeader}>
          <div className={styles.postAuthor}>
            <div 
              className={styles.authorAvatar}
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCAvytpHetbHBoclqocctShLueN0d3j1vLCCILREkyMzOLXw9e5auSU6C6KoAjoQ2RDfwPu_2Bz6AF5hswBmDaiWEhs4YWbqSiRostSwEYvn_Y0E3FJYNO4yFegf-hzyglelo9Fud_Ck0lSLrw7f10Dk82uT4A_LJrL3WBfxT1285e-0ljpmVhW59dduWOmxRWfsd2HJA7qBMQwYEKWRBeUIf7R8UoQREBSS3a4qi9hG7SEwWyEtGhtLJy_79YA2DDQN-3P-qFLOjL")' }}
            />
            <div>
              <h4 className={styles.authorName}>Sarah Williams</h4>
              <p className={styles.postMeta}>San Francisco, CA • 5 hours ago</p>
            </div>
          </div>
          <button className={styles.postOptions}>
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
        
        <div className={styles.postContent}>
          <p className={styles.postText}>
            Just finished working on this abstract pattern design for the new campaign. What do you guys think about these color combinations? 🎨
          </p>
        </div>
        
        <div className={`${styles.postMedia} ${styles.aspect4_3}`}>
          <div 
            className={styles.mediaImage}
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVR3aYiMLVGSbhC4viMr46cPlKLk7G6XIIt47zAHpD1R0LOWMNKqTvD51c_HvWpxS-JE2UqBkyJdPJfmNWp6yJHlqKv7T8tSFGT4_dDHGd0uZrw9IdNv06gTYihvB0jSmg6RW2GQzd-RaGQeyAwsoVouMV7UmkoXYF1U2YhJkzbc3mlvi0NoEoKxqozehqfRHBYusEqJrdSrGz5WIaSqLcDiJpTlM9o8Tq8CQvcp92tS-g4JABsUtGi7OTI7W7AoJxzaI6ERun22IB")' }}
          />
        </div>
        
        <div className={styles.postFooter}>
          <div className={styles.postActions}>
            <div className={styles.actionButtons}>
              <button className={`${styles.actionBtn} ${styles.likeBtn}`}>
                <span className="material-symbols-outlined">favorite_border</span>
                <span className={styles.actionCount}>452</span>
              </button>
              <button className={`${styles.actionBtn} ${styles.commentBtn}`}>
                <span className="material-symbols-outlined">chat_bubble</span>
                <span className={styles.actionCount}>36</span>
              </button>
              <button className={`${styles.actionBtn} ${styles.shareBtn}`}>
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <button className={styles.bookmarkBtn}>
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
          <div className={styles.viewComments}>View all 36 comments</div>
        </div>
      </article> */}
    </section>
  );
};


export default MainContent;