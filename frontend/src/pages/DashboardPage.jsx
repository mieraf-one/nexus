import React, { useContext, useState } from 'react';
import styles from './css/DashboardPage.module.css'; // Changed this line
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { DotSpinner } from '../components/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
import { getReq, postReq, unFollowUser } from '../utils/utils';
import { useEffect } from 'react';
import path from '../utils/apiEndPoints';
import { followUser } from '../utils/utils';

export default function DashboardPage() { 
  return (
    <div className={styles.nexusApp}>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.layoutGrid}>
          <SidebarLeft />
          <MainContent />
          <SidebarRight />
        </div>
      </main>
    </div>
  );
}

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleSearch = async (value) => {
    try {
        const res = await getReq(path.searchUser(value))
        // console.log(res);
        setUsers(res);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <span className="material-symbols-outlined">all_inclusive</span>
          </div>
          <h2 className={styles.logoText}>Nexus</h2>
        </div>
        
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchIcon}>
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className={styles.searchInput}
              placeholder="Search for people, posts, or tags..."
              type="text"
              onChange={(e) => { handleSearch(e.target.value); }}
            />
            
            <div className={styles.searchDropdown}>
              <div className={styles.dropdownContent}>
                {/* <h4 className={styles.dropdownTitle}>Suggested Users</h4> */}

                {/* searched users */}
                {users.map((user) => (
                  <>
                  {/* {users.length == 0 && <h4>Not found.</h4>} */}
                  <Link
                      key={user.id}
                      to={`/user/${user.username}`}
                      className={styles.dropdownItem}
                  >
                      <div 
                        className={styles.dropdownAvatar}
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFniLr9qQ4CyMr7gt_qH24PZq4DIBiAoXewcG0PV1tilRCyEE5kMENVO3PA-BDYFeOKp7kX8wLfwEJ7ZRaCM6Ud8MX5XZDJq6NEABH8fIRUGzXPC6ZeahQeSXt3Oa6rC6shhdl7b_wCOM-H3QW55eMINzf5nKVUeAU7LLFct__MMyEYJU2RHCLjJyBt7W67fYv2aDn3cgLs6PH2aZp-ZMtuDpkiGGAzqykfmuNHuzPHu9tTsS8fRgCCkt0wyDv4Dqny52Kj7EZpN3y")' }}
                      ></div>
                      <div className={styles.dropdownUserInfo}>
                        <h5 className={styles.dropdownUsername}>{user.first_name}</h5>
                        <p className={styles.dropdownUserhandle}>@{user.username}</p>
                      </div>
                  </Link>
                    {/* <a  
                        key={user.id}
                        href="#"
                        className={styles.dropdownItem}
                    >
                      <div 
                        className={styles.dropdownAvatar}
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFniLr9qQ4CyMr7gt_qH24PZq4DIBiAoXewcG0PV1tilRCyEE5kMENVO3PA-BDYFeOKp7kX8wLfwEJ7ZRaCM6Ud8MX5XZDJq6NEABH8fIRUGzXPC6ZeahQeSXt3Oa6rC6shhdl7b_wCOM-H3QW55eMINzf5nKVUeAU7LLFct__MMyEYJU2RHCLjJyBt7W67fYv2aDn3cgLs6PH2aZp-ZMtuDpkiGGAzqykfmuNHuzPHu9tTsS8fRgCCkt0wyDv4Dqny52Kj7EZpN3y")' }}
                      ></div>
                      <div className={styles.dropdownUserInfo}>
                        <h5 className={styles.dropdownUsername}>{user.first_name}</h5>
                        <p className={styles.dropdownUserhandle}>@{user.username}</p>
                      </div>
                    </a> */}
                    </>
                ))}                
                
                <a href="#" className={styles.dropdownSeeAll}>
                  See all results
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.userSection} onClick={() => {navigate('/profile')}}>
          <div className={styles.userProfile}>
            <span className={styles.username}>{user?.user?.username}</span>
            <div 
              className={styles.userAvatar}
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAGOO2c733Sn-XaBGWfmdFMayLADmKtDVH68HNtYVZbyPNn3KbALF46kD_fbGL-dLsi6vo-jfkOOSavRYy4EVK7nli4Dthhfp33HM3RFbyK9SDpiZAzfeTRbrwKSqf43ZxeC3OKpm1nmHorH47QKK-f1bgiQLzpswuGqkpFg7eIr2tljTiODiXn7bV-F7ZaQql3naCvrKSSIsoMsR4IM0ltvh3XJeHn_hGC6RdBXm6x6P7oaK2bfdDonOBu0xRusbj-JRaTUbxER_o5")' }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

const SidebarLeft = () => {
  return (
    <aside className={styles.sidebarLeft}>
      <nav className={styles.sidebarNav}>
        <a href="#" className={`${styles.navItem} ${styles.active}`}>
          <span className="material-symbols-outlined">home</span>
          Home Feed
        </a>
        <a href="#" className={styles.navItem}>
          <span className="material-symbols-outlined">explore</span>
          Explore
        </a>
        <a href="#" className={styles.navItem}>
          <span className="material-symbols-outlined">chat</span>
          Messages
        </a>
        <a href="#" className={styles.navItem}>
          <span className="material-symbols-outlined">bookmarks</span>
          Saved Posts
        </a>
        <a href="#" className={styles.navItem}>
          <span className="material-symbols-outlined">settings</span>
          Settings
        </a>
      </nav>
      
      <button className={styles.createPostBtn}>
        <span className="material-symbols-outlined">add_circle</span>
        Create New Post
      </button>
    </aside>
  );
};

const MainContent = () => {
  const stories = [
    { name: 'Your Story', image: null, isAdd: true },
    { name: 'James', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc")', hasBorder: true },
    { name: 'Sarah W.', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCAvytpHetbHBoclqocctShLueN0d3j1vLCCILREkyMzOLXw9e5auSU6C6KoAjoQ2RDfwPu_2Bz6AF5hswBmDaiWEhs4YWbqSiRostSwEYvn_Y0E3FJYNO4yFegf-hzyglelo9Fud_Ck0lSLrw7f10Dk82uT4A_LJrL3WBfxT1285e-0ljpmVhW59dduWOmxRWfsd2HJA7qBMQwYEKWRBeUIf7R8UoQREBSS3a4qi9hG7SEwWyEtGhtLJy_79YA2DDQN-3P-qFLOjL")', hasBorder: true },
    { name: 'Mike T.', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlq1M1MGGt0eKcXODBfGkPcBawBYu_18UZ6biXFlrQdmyXE5CClkjDPWPleIldHb5suWVDhtEQP5I2GQH_QOPW7DmtYS7IyCuhA5NkH-TFFpA6eB7_CIB_hWJVCnUjyQ2vCN84ugMttKwojgInPjWcE1zVWnZbNLlDnFgyUydW8wc_WJuPwM_fRa2Zx6T17hVoAkB3UbY7Hn8GCW3Upv7NnA_PpVn-e_RL3hefEHjMs_WUpMqEqwytRlKuJCgHtkmhIC5Ahfp05WMr")', hasBorder: false },
    { name: 'James W.', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc")', hasBorder: false }
  ];

  return (
    <section className={styles.mainContent}>
      <div className={styles.storiesCard}>
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
      </div>

      {/* Post 1 */}
      <article className={styles.postCard}>
        <div className={styles.postHeader}>
          <div className={styles.postAuthor}>
            <div 
              className={styles.authorAvatar}
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc")' }}
            />
            <div>
              <h4 className={styles.authorName}>James Wilson</h4>
              <p className={styles.postMeta}>London, UK • 2 hours ago</p>
            </div>
          </div>
          <button className={styles.postOptions}>
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
        
        <div className={styles.postContent}>
          <p className={styles.postText}>
            finally getting back into the office rhythm! The new collaborative space is looking absolutely stunning. 🚀 
            <span className={styles.hashtag}> #OfficeLife #Productivity #NewBeginnings</span>
          </p>
        </div>
        
        <div className={styles.postMedia}>
          <div 
            className={styles.mediaImage}
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhStffcVfIewZlSjM8GxuTfoChh_EM-uR2qRIz-DFSoSx0VBmjuGTnCQh85zUZnAgZ1jJjIvWDFewBSRFEPtu-VoEx6MQwkW7FBg5g_rNS0w6naDeIr75QNmZU9tuc5T-4v1PcF86LLAtVJEdxgj8tKr3PlAmn0G2YfRXxqTmgHIWZmWFS1W6ywigWbBepiXCmhVhubThaSvFgQzYog_wJ04FceLeb78BGnLkAr7AiywwU_oynQa5_kWZBx5S8F6__qfJJTD-gEVMH")' }}
          />
        </div>
        
        <div className={styles.postFooter}>
          <div className={styles.postActions}>
            <div className={styles.actionButtons}>
              <button className={`${styles.actionBtn} ${styles.likeBtn}`}>
                <span className="material-symbols-outlined">favorite</span>
                <span className={styles.actionCount}>1.2k</span>
              </button>
              <button className={`${styles.actionBtn} ${styles.commentBtn}`}>
                <span className="material-symbols-outlined">chat_bubble</span>
                <span className={styles.actionCount}>84</span>
              </button>
              <button className={`${styles.actionBtn} ${styles.shareBtn}`}>
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <button className={styles.bookmarkBtn}>
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
          
          <div className={styles.postLikes}>
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
          </div>
          
          <div className={styles.postComments}>
            <div className={styles.commentItem}>
              <span className={styles.commentAuthor}>Sarah W.</span>
              <span className={styles.commentText}>Looks amazing! Can't wait to visit.</span>
            </div>
            <div className={styles.viewComments}>View all 84 comments</div>
          </div>
          
          <div className={styles.addComment}>
            <div 
              className={styles.commentAvatar}
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFniLr9qQ4CyMr7gt_qH24PZq4DIBiAoXewcG0PV1tilRCyEE5kMENVO3PA-BDYFeOKp7kX8wLfwEJ7ZRaCM6Ud8MX5XZDJq6NEABH8fIRUGzXPC6ZeahQeSXt3Oa6rC6shhdl7b_wCOM-H3QW55eMINzf5nKVUeAU7LLFct__MMyEYJU2RHCLjJyBt7W67fYv2aDn3cgLs6PH2aZp-ZMtuDpkiGGAzqykfmuNHuzPHu9tTsS8fRgCCkt0wyDv4Dqny52Kj7EZpN3y")' }}
            />
            <input 
              type="text" 
              className={styles.commentInput}
              placeholder="Add a comment..."
            />
          </div>
        </div>
      </article>

      {/* Post 2 */}
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
      </article>
    </section>
  );
};

const SidebarRight = () => {
  const { user, loading } = useContext(UserContext);
  const { refresh } = useContext(AuthContext);
  const [suggestAccounts, setSuggestAccounts] = useState([]);
  const [childLoading, setChildLoading] = useState(false);
  const navigate = useNavigate();
  
  const fetchSuggestions = async () => {
      try {
        setChildLoading(true);

        const res = await getReq(path.followSuggestions);
        console.log(res)
        setSuggestAccounts(res.results);

      } catch (error) {
        console.log(error.message);

      } finally {
        setChildLoading(false);
      }
    }

  useEffect(() => {
    fetchSuggestions();
  }, [])

  const handleFollowUser = async (id) => {
    try {
      await followUser(id);

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

  const handleUnFollowUser = async (id) => {
    try {
      await unFollowUser(id);

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

  const image = 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlq1M1MGGt0eKcXODBfGkPcBawBYu_18UZ6biXFlrQdmyXE5CClkjDPWPleIldHb5suWVDhtEQP5I2GQH_QOPW7DmtYS7IyCuhA5NkH-TFFpA6eB7_CIB_hWJVCnUjyQ2vCN84ugMttKwojgInPjWcE1zVWnZbNLlDnFgyUydW8wc_WJuPwM_fRa2Zx6T17hVoAkB3UbY7Hn8GCW3Upv7NnA_PpVn-e_RL3hefEHjMs_WUpMqEqwytRlKuJCgHtkmhIC5Ahfp05WMr")'

  return (
    <aside className={styles.sidebarRight}>
      {loading
      ?
        <DotSpinner />
      :
      <Link to={'/profile'} className={styles.profileCard}>
          <div className={styles.profileAvatar}>
          <div 
            className={styles.avatarImage}
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFniLr9qQ4CyMr7gt_qH24PZq4DIBiAoXewcG0PV1tilRCyEE5kMENVO3PA-BDYFeOKp7kX8wLfwEJ7ZRaCM6Ud8MX5XZDJq6NEABH8fIRUGzXPC6ZeahQeSXt3Oa6rC6shhdl7b_wCOM-H3QW55eMINzf5nKVUeAU7LLFct__MMyEYJU2RHCLjJyBt7W67fYv2aDn3cgLs6PH2aZp-ZMtuDpkiGGAzqykfmuNHuzPHu9tTsS8fRgCCkt0wyDv4Dqny52Kj7EZpN3y")' }}
          />
          <div className={styles.onlineIndicator}></div>
        </div>
        <div className={styles.profileInfo}>
          <h3 className={styles.profileName}>{user?.first_name}</h3>
          <p className={styles.profileHandle}>@{user?.username}</p>
        </div>
        <span className={`material-symbols-outlined ${styles.chevron}`}>chevron_right</span>
      </Link> 
      }
      
      {childLoading 
      ?
      <DotSpinner />
      :
        <div className={styles.friendsCard}>
        <div className={styles.friendsHeader}>
          <h3 className={styles.friendsTitle}>Friend Suggestions</h3>
          <button className={styles.seeAllBtn}>See all</button>
        </div>
        <div className={styles.friendsList}>
          {suggestAccounts.map((user) => (
            <div key={user.id} className={styles.friendItem}>
              <div className={styles.friendInfo}>
                <div 
                  className={styles.friendAvatar}
                  style={{ backgroundImage: image }}
                />
                <div
                  className={styles.friendDetails}
                  onClick={() => {navigate(`/user/${user.username}`)}}
                >
                  <h4 className={styles.friendName}>{user.first_name}</h4>
                  <p className={styles.friendHandle}>@{user.username}</p>
                </div>
              </div>
              <button
                  className={`${styles.followBtn} ${user.is_following ? styles.following : ''}`}
                  onClick={() => {user.is_following ? handleUnFollowUser(user.id) : handleFollowUser(user.id)}}
              >
                {user.is_following ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
      }
      
      <div className={styles.footerLinks}>
        <a href="#" className={styles.footerLink}>About</a>
        <a href="#" className={styles.footerLink}>Help</a>
        <a href="#" className={styles.footerLink}>Privacy</a>
        <a href="#" className={styles.footerLink}>Terms</a>
        <span className={styles.copyright}>© 2026 Nexus Inc.</span>
      </div>
    </aside>
  );
};