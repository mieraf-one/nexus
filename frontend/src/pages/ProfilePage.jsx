import React, { useContext, useState } from 'react';
import styles from './css/ProfilePage.module.css';
import popupStyles from './css/FollowingPopup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { DotSpinner } from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import FollowingModal from '../components/FollowingModal';
import FollowersModal from '../components/FollowersModal';

export default function ProfilePage() {
    const { user, loading } = useContext(UserContext);
    const { logout } = useContext(AuthContext);
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);


  const posts = [
    {
      id: 1,
      title: "Tokyo Sunset Vibes",
      description: "Capturing the golden hour in Shibuya. The colors were absolutely unreal today! 🌆📸 #Tokyo #Photography",
      time: "2h ago",
      likes: "1.2k",
      comments: "86",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIt3IrgNWXByEU5bD_You09jSeABItmrTP2w0vdlcuc66MgKpEu2xeWOuBmKk6a7Mi_w81wZtvJ0gr4NHw_TQ0xb-rfMUL3HVxut522T6pfqkjkg8-p-ks6gdh3BjyOTY5v0720NCxl-tr9wL_TZc1N3gWLEvwPUog-KDCMmKqKN8R1Cv6HcUu9P75A-mdNNFZ_rFUFrZjG-pBOGXE7da-NcIWPBywrMHQ19t-KKcJt9ybI2SPWEkwjLeMQHoroX1zcngMPaVYBnSt",
      hasMultiple: true
    },
    {
      id: 2,
      title: "New Design System",
      description: "Just finished the first draft of the new component library. Check out the button states! 🎨✨",
      time: "5h ago",
      likes: "843",
      comments: "42",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTC-nVs0AAIMO4V2JIZ3ILj7gbG6YLGNkgVo6qNikjC29hRbsYV6j85m6W_g4A6yfPgl10giIsoPZ6RE52ULEoM_7j7u3N4JS34n49OS4qO0FZDcF2oiv-MMfpvQSbOzrRrtQdYFiVJqCTHpdrsXQeind25zhPOxrbLJ1SGPOd0-zAgOVuk8mDBq4dEs_nKQ9Eeq5acnhKMIqA3U2DdCaMf9vJmoq7Imx1ozKw8TaloJVOKeTXLKaD-kHrqXcRRo7yD_oBvKnHZcce"
    },
    {
      id: 3,
      title: "Workspace Setup",
      description: "Finally got the standing desk organized. Productivity boost incoming! 🚀",
      time: "1d ago",
      likes: "2.1k",
      comments: "156",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAx7Emoh1bzkU4uKOgoegQXOo3Kn_sBO0ihDpXKnS15yM5rpEqr1P34-V8UfnRjyAJdjsLU0_LaBHLjHQcGXgqbf13uBEkrZHpg3PG1rkXJZ_dpiAAyyK5spCEoGvioj5yh6H5pTb_A4njHsWzA4PIPJSjCPHWd84c8vMPpT20Q_q9n5vptZbTKEDP999MqFN1U0uFYFec3oUgiak7Bok1sg14QayBOSnCXBh258PNGoDFvWH3S7kQh8FpBv3GB-qiYaTtyOLl1QZCB"
    },
    {
      id: 4,
      title: "Morning Brew",
      description: "Fueling up for a long coding session. ☕️",
      time: "2d ago",
      likes: "542",
      comments: "23",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9iCvDBceAojztThILD1mKzgPQFnZeQdW6Hg2wXf3MMdlNrPp2MD8zu_BXZnI95Ux8O368Bkod-TmVsDIzxQd5jW_uDxWojAD8Swj46sPjFQ8BF4P0yt9B8tZRovQnaJHubGaPx8yraLhI20NNHbNmdgXI3J2aN3u6bFDjz9Y6r92fk6n6Cz8YDvxt3Os-wgYTpEj787nM2gjeWabO2MGMBEl0OdAXjlqrdU9bKoXfq4jgCtH0R8egtFyZTW9ErNPA5Mqm-wW2XvpG"
    },
    {
      id: 5,
      title: "Night City",
      description: "Neon lights and rain. The cyberpunk aesthetic is real tonight. ☔️🏙️",
      time: "3d ago",
      likes: "3.4k",
      comments: "201",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA-uN3MQ6r70AUOtO0aMPFPuc8DF91t2oKru5lyKalgXUbQsicM3XwKaVddVREWbSkeLQf8bKF9EwWHCozx4kbai80wWBGdP4OyTGKy1pWG0CL0dKiOxOtS8CU7lW4YZBSkRyvNtgPkj2Xsr7hUJbVa6Cj_Mi-T1lRCDh0jbqA3EH-Ven9vE1YvJ6kE89vhw7X_vhqEZT3GrkHSL7CiCyzU0Xcn7AqmIzw_NI2ncJSUGBLgKKn58hc39nE3MA1RLJVjZSFsRez0SAt"
    },
    {
      id: 6,
      title: "Sketching Ideas",
      description: "Back to basics with pen and paper. Sometimes low-fi is the best way to start. ✏️",
      time: "4d ago",
      likes: "980",
      comments: "67",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxhLjLejoxaHHfIDm_bxwchHvP346ZxjjqdfdAzkU3qQfoy3kqaV1NnQljmaxlW6Nbl_GcDnKQZce-vYiDAMWoxWh2xjSLDLlpKGcsBPh2L_0zftVlTJmlFDEbVU12kORAIGfva9eXMDChHF9C8nzW66opmrdcuvARV3ua6JDruMGqB23y1gkpWOtHxP-0A6Wmg7GYscg-BxGHyu2hDs3cxH6_JFy-zgnTTMxY58vczh_Pz5M7fxbLIOgJQekGze9gcD-pELVYE9Oe"
    }
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Top Navigation Bar */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Logo & Branding */}
          <div className={styles.logoContainer}>
            <Link to={'/dashboard'} className={styles.logoLink}>
              <div className={styles.logoIcon}>
                <span className="material-symbols-outlined">all_inclusive</span>
              </div>
              <h2 className={styles.logoText}>Nexus</h2>
            </Link>
          </div>

            {/* Center Navigation Bar */}
            <nav className={styles.navigation}>
                <Link to={'/dashboard'} className={styles.navLink}>
                    <span className="material-symbols-outlined">home</span>
                    <span className={styles.navText}>Home</span>
                </Link>

                <a className={styles.navLink} href="#">
                    <span className="material-symbols-outlined">explore</span>
                    <span className={styles.navText}>Explore</span>
                </a>
                <a className={styles.navLink} href="#">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className={styles.navText}>Notifications</span>
                </a>
                <a className={`${styles.navLink} ${styles.active}`} href="#">
                    <span className="material-symbols-outlined">person</span>
                    <span className={styles.navText}>Profile</span>
                </a>
            </nav>
            <div></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Profile Header Section */}
        <div className={styles.profileHeader}>
          {/* Avatar */}
          <div className={styles.avatarContainer}>
            <div className={styles.avatarGradient}>
              <div className={styles.avatarInner}>
                <div 
                  className={styles.avatarImage} 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhgBGR8bwJax1bkjvEJXrdwT0-P8dE9q8tI2fTLK1SHCzI5snoFH6oiPINeJzGWBVX7VCt1trVOpwQ8uHU3RJNloFNjBwKyrJ6wj97Ol5KCo_bCFdOnopx6gvNjmV1ZcFM8Vgcp4D2rlTb8CP6eLmFav6lRTfuG10ekAgQ_qm73Q61F7_AqO0UX6vt05asMAc2hT7XsbUtIbpfCLIzCBZtkn-0ySBha83Jv5_KNmLiLXGdEl9fprPIBvAvkmRJX9WN17lFA_fVvx3I")' }}
                ></div>
              </div>
            </div>
            <div className={styles.statusIndicator}></div>
          </div>


          {/* User Info */}
          {loading
            
            ?
            
            <DotSpinner />
            
            :
            <>
            <div className={styles.userInfo}>
                <h1 className={styles.userName}>{user?.user?.first_name} {user?.user?.last_name}</h1>
                <p className={styles.userHandle}>@{user?.user?.username}</p>
                <p className={styles.userBio}>
                {user?.bio || "bio"}
                </p>
            </div>
            
            {/* Stats Row */}
            <div className={styles.statsContainer}>

              {/* Followers button*/}
                <div>
                  <button
                    className={styles.statItem}
                    onClick={() => {setIsFollowersModalOpen(true);}}
                  >
                      <span className={styles.statNumber}>{(user?.follower)?.length}</span>
                      <span className={styles.statLabel}>Followers</span>
                  </button>

                  <FollowersModal
                    isOpen={isFollowersModalOpen}
                    onClose={() => {setIsFollowersModalOpen(false);}}>
                  </FollowersModal>

                </div>
                
                
                {/* divider */}
                <div className={styles.statDivider}></div>


                {/* Following button */}
                <div>
                  <button
                  className={styles.statItem}
                  onClick={() => {setIsFollowingModalOpen(true);}}
                >
                    <span className={styles.statNumber}>{(user?.following)?.length}</span>
                    <span className={styles.statLabel}>Following</span>
                </button>

                <FollowingModal
                  isOpen={isFollowingModalOpen}
                  onClose={() => {setIsFollowingModalOpen(false);}}>
                </FollowingModal>    
                </div>
                
                
            </div>
            </>

            }
          
          
          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <Link to={'/profile/edit'} className={styles.editButton} style={{textDecoration: 'none'}}>
                <span className="material-symbols-outlined">edit</span>
                <span>Edit Profile</span>
            </Link>
            <button className={styles.iconButton}>
              <span className="material-symbols-outlined">ios_share</span>
            </button>
            <button className={styles.iconButton}>
              <span className="material-symbols-outlined">settings</span>
            </button>
            <button className={styles.iconButton} onClick={logout}>
                <span className="material-symbols-outlined logout-icon">logout</span>
            </button>

          </div>
        </div>

        {/* Content Tabs */}
        <div className={styles.contentTabs}>
          <div className={styles.tabsContainer}>
            <nav className={styles.tabsNav}>
              <a className={`${styles.tabLink} ${styles.tabActive}`} href="#">
                <span className="material-symbols-outlined">grid_view</span>
                <span className={styles.tabText}>Posts</span>
              </a>
              <a className={styles.tabLink} href="#">
                <span className="material-symbols-outlined">image</span>
                <span className={styles.tabText}>Photos</span>
              </a>
              <a className={styles.tabLink} href="#">
                <span className="material-symbols-outlined">bookmark</span>
                <span className={styles.tabText}>Saved</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Image Grid / Posts Feed */}
        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postImage}>
                <div 
                  className={styles.imageContent}
                  style={{ backgroundImage: `url("${post.image}")` }}
                ></div>
                <div className={styles.imageOverlay}></div>
                {post.hasMultiple && (
                  <div className={styles.collectionBadge}>
                    <span className="material-symbols-outlined">collections</span>
                    <span>Multiple</span>
                  </div>
                )}
              </div>
              <div className={styles.postContent}>
                <div className={styles.postHeader}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <span className={styles.postTime}>{post.time}</span>
                </div>
                <p className={styles.postDescription}>{post.description}</p>
                <div className={styles.postActions}>
                  <div className={styles.actionItem}>
                    <span className="material-symbols-outlined">favorite</span>
                    <span className={styles.actionCount}>{post.likes}</span>
                  </div>
                  <div className={styles.actionItem}>
                    <span className="material-symbols-outlined">chat_bubble</span>
                    <span className={styles.actionCount}>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};



function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}