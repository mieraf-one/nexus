import React, { useContext } from 'react';
import './css/DashboardPage.css';
import { AuthContext } from '../context/AuthContext';

export default function DashboardPage() {
  return (
    <div className="nexus-app">
      <Header />
      <main className="main-container">
        <div className="layout-grid">
          <SidebarLeft />
          <MainContent />
          <SidebarRight />
        </div>
      </main>
    </div>
  );
}


const Header = () => {
  const { logout } = useContext(AuthContext);
  
 return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <span className="material-symbols-outlined">all_inclusive</span>
          </div>
          <h2 className="logo-text">Nexus</h2>
        </div>
        
        <div className="search-section">
          <div className="search-wrapper">
            <span className="material-symbols-outlined search-icon">search</span>
            <input 
              type="text" 
              className="search-input"
              placeholder="Search for people, posts, or tags..."
            />
          </div>
        </div>
        
        <div className="actions-section">
          <button className="logout-button" onClick={logout}>
            <span className="material-symbols-outlined logout-icon">logout</span>
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};


const SidebarLeft = () => {
   return (
    <aside className="sidebar-left">
      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">
          <span className="material-symbols-outlined">home</span>
          Home Feed
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">explore</span>
          Explore
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">chat</span>
          Messages
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">bookmarks</span>
          Saved Posts
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">settings</span>
          Settings
        </a>
      </nav>
      
      <button className="create-post-btn">
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
    <section className="main-content">
      {/* Stories Section */}
      <div className="stories-card">
        <div className="stories-header">
          <h3 className="stories-title">Stories</h3>
          <button className="see-all-btn">See all</button>
        </div>
        <div className="stories-container">
          {stories.map((story, index) => (
            <div key={index} className="story-item">
              <div className={`story-circle ${story.isAdd ? 'add-story' : story.hasBorder ? 'gradient-border' : 'normal-border'}`}>
                <div className="story-inner">
                  {story.isAdd ? (
                    <span className="material-symbols-outlined">add</span>
                  ) : (
                    <div className="story-image" style={{ backgroundImage: story.image }} />
                  )}
                </div>
              </div>
              <span className="story-name">{story.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Post 1 */}
      <article className="post-card">
        <div className="post-header">
          <div className="post-author">
            <div 
              className="author-avatar"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc")' }}
            />
            <div>
              <h4 className="author-name">James Wilson</h4>
              <p className="post-meta">London, UK • 2 hours ago</p>
            </div>
          </div>
          <button className="post-options">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
        
        <div className="post-content">
          <p className="post-text">
            finally getting back into the office rhythm! The new collaborative space is looking absolutely stunning. 🚀 
            <span className="hashtag"> #OfficeLife #Productivity #NewBeginnings</span>
          </p>
        </div>
        
        <div className="post-media">
          <div 
            className="media-image"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhStffcVfIewZlSjM8GxuTfoChh_EM-uR2qRIz-DFSoSx0VBmjuGTnCQh85zUZnAgZ1jJjIvWDFewBSRFEPtu-VoEx6MQwkW7FBg5g_rNS0w6naDeIr75QNmZU9tuc5T-4v1PcF86LLAtVJEdxgj8tKr3PlAmn0G2YfRXxqTmgHIWZmWFS1W6ywigWbBepiXCmhVhubThaSvFgQzYog_wJ04FceLeb78BGnLkAr7AiywwU_oynQa5_kWZBx5S8F6__qfJJTD-gEVMH")' }}
          />
        </div>
        
        <div className="post-footer">
          <div className="post-actions">
            <div className="action-buttons">
              <button className="action-btn like-btn">
                <span className="material-symbols-outlined">favorite</span>
                <span className="action-count">1.2k</span>
              </button>
              <button className="action-btn comment-btn">
                <span className="material-symbols-outlined">chat_bubble</span>
                <span className="action-count">84</span>
              </button>
              <button className="action-btn share-btn">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <button className="bookmark-btn">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
          
          <div className="post-likes">
            <div className="liked-by-avatars">
              <div 
                className="liked-avatar"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCAvytpHetbHBoclqocctShLueN0d3j1vLCCILREkyMzOLXw9e5auSU6C6KoAjoQ2RDfwPu_2Bz6AF5hswBmDaiWEhs4YWbqSiRostSwEYvn_Y0E3FJYNO4yFegf-hzyglelo9Fud_Ck0lSLrw7f10Dk82uT4A_LJrL3WBfxT1285e-0ljpmVhW59dduWOmxRWfsd2HJA7qBMQwYEKWRBeUIf7R8UoQREBSS3a4qi9hG7SEwWyEtGhtLJy_79YA2DDQN-3P-qFLOjL")' }}
              />
              <div 
                className="liked-avatar"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlq1M1MGGt0eKcXODBfGkPcBawBYu_18UZ6biXFlrQdmyXE5CClkjDPWPleIldHb5suWVDhtEQP5I2GQH_QOPW7DmtYS7IyCuhA5NkH-TFFpA6eB7_CIB_hWJVCnUjyQ2vCN84ugMttKwojgInPjWcE1zVWnZbNLlDnFgyUydW8wc_WJuPwM_fRa2Zx6T17hVoAkB3UbY7Hn8GCW3Upv7NnA_PpVn-e_RL3hefEHjMs_WUpMqEqwytRlKuJCgHtkmhIC5Ahfp05WMr")' }}
              />
            </div>
            <p className="likes-text">
              Liked by <span className="liked-name">Sarah W.</span> and <span className="liked-name">thousands of others</span>
            </p>
          </div>
          
          <div className="post-comments">
            <div className="comment-item">
              <span className="comment-author">Sarah W.</span>
              <span className="comment-text">Looks amazing! Can't wait to visit.</span>
            </div>
            <div className="view-comments">View all 84 comments</div>
          </div>
          
          <div className="add-comment">
            <div 
              className="comment-avatar"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFniLr9qQ4CyMr7gt_qH24PZq4DIBiAoXewcG0PV1tilRCyEE5kMENVO3PA-BDYFeOKp7kX8wLfwEJ7ZRaCM6Ud8MX5XZDJq6NEABH8fIRUGzXPC6ZeahQeSXt3Oa6rC6shhdl7b_wCOM-H3QW55eMINzf5nKVUeAU7LLFct__MMyEYJU2RHCLjJyBt7W67fYv2aDn3cgLs6PH2aZp-ZMtuDpkiGGAzqykfmuNHuzPHu9tTsS8fRgCCkt0wyDv4Dqny52Kj7EZpN3y")' }}
            />
            <input 
              type="text" 
              className="comment-input"
              placeholder="Add a comment..."
            />
          </div>
        </div>
      </article>

      {/* Post 2 */}
      <article className="post-card">
        <div className="post-header">
          <div className="post-author">
            <div 
              className="author-avatar"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCAvytpHetbHBoclqocctShLueN0d3j1vLCCILREkyMzOLXw9e5auSU6C6KoAjoQ2RDfwPu_2Bz6AF5hswBmDaiWEhs4YWbqSiRostSwEYvn_Y0E3FJYNO4yFegf-hzyglelo9Fud_Ck0lSLrw7f10Dk82uT4A_LJrL3WBfxT1285e-0ljpmVhW59dduWOmxRWfsd2HJA7qBMQwYEKWRBeUIf7R8UoQREBSS3a4qi9hG7SEwWyEtGhtLJy_79YA2DDQN-3P-qFLOjL")' }}
            />
            <div>
              <h4 className="author-name">Sarah Williams</h4>
              <p className="post-meta">San Francisco, CA • 5 hours ago</p>
            </div>
          </div>
          <button className="post-options">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
        
        <div className="post-content">
          <p className="post-text">
            Just finished working on this abstract pattern design for the new campaign. What do you guys think about these color combinations? 🎨
          </p>
        </div>
        
        <div className="post-media aspect-4-3">
          <div 
            className="media-image"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVR3aYiMLVGSbhC4viMr46cPlKLk7G6XIIt47zAHpD1R0LOWMNKqTvD51c_HvWpxS-JE2UqBkyJdPJfmNWp6yJHlqKv7T8tSFGT4_dDHGd0uZrw9IdNv06gTYihvB0jSmg6RW2GQzd-RaGQeyAwsoVouMV7UmkoXYF1U2YhJkzbc3mlvi0NoEoKxqozehqfRHBYusEqJrdSrGz5WIaSqLcDiJpTlM9o8Tq8CQvcp92tS-g4JABsUtGi7OTI7W7AoJxzaI6ERun22IB")' }}
          />
        </div>
        
        <div className="post-footer">
          <div className="post-actions">
            <div className="action-buttons">
              <button className="action-btn like-btn">
                <span className="material-symbols-outlined">favorite_border</span>
                <span className="action-count">452</span>
              </button>
              <button className="action-btn comment-btn">
                <span className="material-symbols-outlined">chat_bubble</span>
                <span className="action-count">36</span>
              </button>
              <button className="action-btn share-btn">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <button className="bookmark-btn">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
          <div className="view-comments">View all 36 comments</div>
        </div>
      </article>
    </section>
  );
};

const SidebarRight = () => {
  const friendSuggestions = [
    { name: 'Mike Thompson', handle: '@miket_design', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlq1M1MGGt0eKcXODBfGkPcBawBYu_18UZ6biXFlrQdmyXE5CClkjDPWPleIldHb5suWVDhtEQP5I2GQH_QOPW7DmtYS7IyCuhA5NkH-TFFpA6eB7_CIB_hWJVCnUjyQ2vCN84ugMttKwojgInPjWcE1zVWnZbNLlDnFgyUydW8wc_WJuPwM_fRa2Zx6T17hVoAkB3UbY7Hn8GCW3Upv7NnA_PpVn-e_RL3hefEHjMs_WUpMqEqwytRlKuJCgHtkmhIC5Ahfp05WMr")', isFollowing: false },
    { name: 'Sarah Jenkins', handle: '@sarah_j', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCAvytpHetbHBoclqocctShLueN0d3j1vLCCILREkyMzOLXw9e5auSU6C6KoAjoQ2RDfwPu_2Bz6AF5hswBmDaiWEhs4YWbqSiRostSwEYvn_Y0E3FJYNO4yFegf-hzyglelo9Fud_Ck0lSLrw7f10Dk82uT4A_LJrL3WBfxT1285e-0ljpmVhW59dduWOmxRWfsd2HJA7qBMQwYEKWRBeUIf7R8UoQREBSS3a4qi9hG7SEwWyEtGhtLJy_79YA2DDQN-3P-qFLOjL")', isFollowing: true },
    { name: 'James Wright', handle: '@james_writes', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc")', isFollowing: true },
    { name: 'Emily Chen', handle: '@emily_c', image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASqnoqallbOltYisWtkeWuH__miWyYk9YrVjxkby3mKdhcNkadi9B9Keelh8CSjnU5K-gFmia4mC9wycTDa2Ry9j0t0nupcYdKrk1nmOml8-Q51HTg44mzwfl6Tu-Bm7IDZk3y84zfPkNCxd7t24vUDcKa_5bFWqqtTY8LLUi0S6W8DlDBPkiKuH2gCFkQKj5YqQht5ZTC_8ZG75pH5H3bt76axzxKhRWlw6HEqLwcbva5jsFXwjDZO87zAbephzokpZ7VzMCjeOyc")', isFollowing: true }
  ];

  return (
    <aside className="sidebar-right">
      <a href="#" className="profile-card">
        <div className="profile-avatar">
          <div 
            className="avatar-image"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFniLr9qQ4CyMr7gt_qH24PZq4DIBiAoXewcG0PV1tilRCyEE5kMENVO3PA-BDYFeOKp7kX8wLfwEJ7ZRaCM6Ud8MX5XZDJq6NEABH8fIRUGzXPC6ZeahQeSXt3Oa6rC6shhdl7b_wCOM-H3QW55eMINzf5nKVUeAU7LLFct__MMyEYJU2RHCLjJyBt7W67fYv2aDn3cgLs6PH2aZp-ZMtuDpkiGGAzqykfmuNHuzPHu9tTsS8fRgCCkt0wyDv4Dqny52Kj7EZpN3y")' }}
          />
          <div className="online-indicator"></div>
        </div>
        <div className="profile-info">
          <h3 className="profile-name">Alex Morgan</h3>
          <p className="profile-handle">@alex_creative</p>
        </div>
        <span className="material-symbols-outlined chevron">chevron_right</span>
      </a>
      
      <div className="friends-card">
        <div className="friends-header">
          <h3 className="friends-title">Friend Suggestions</h3>
          <button className="see-all-btn">See all</button>
        </div>
        <div className="friends-list">
          {friendSuggestions.map((friend, index) => (
            <div key={index} className="friend-item">
              <div className="friend-info">
                <div 
                  className="friend-avatar"
                  style={{ backgroundImage: friend.image }}
                />
                <div className="friend-details">
                  <h4 className="friend-name">{friend.name}</h4>
                  <p className="friend-handle">{friend.handle}</p>
                </div>
              </div>
              <button className={`follow-btn ${friend.isFollowing ? 'following' : ''}`}>
                {friend.isFollowing ? 'Follow' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="footer-links">
        <a href="#" className="footer-link">About</a>
        <a href="#" className="footer-link">Help</a>
        <a href="#" className="footer-link">Privacy</a>
        <a href="#" className="footer-link">Terms</a>
        <span className="copyright">© 2026 Nexus Inc.</span>
      </div>
    </aside>
  );
};
