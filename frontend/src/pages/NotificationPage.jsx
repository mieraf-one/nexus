import React, { useEffect, useState } from 'react';
import styles from './css/NotificationPage.module.css';
import { getReq } from '../utils/utils';
import path from '../utils/apiEndPoints';
import { useNavigate } from 'react-router-dom';
import { DotSpinner } from '../components/LoadingSpinner';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);

                const res = await getReq(path.notifications);
                console.log(res)
                setNotifications(res);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchNotifications();
    }, [])


    if (loading) return <DotSpinner />

  return (
    <div className={styles.pageContainer}>
      {/* Navigation Bar */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoIcon}>
                <span className="material-symbols-outlined">hub</span>
              </div>
              <h2 className={styles.logoText}>Nexus</h2>
            </div>
            <nav className={styles.navLinks}>
              <a className={styles.navLink} href="#">Home</a>
              <a className={styles.navLink} href="#">Explore</a>
              <a className={`${styles.navLink} ${styles.navLinkActive}`} href="#">Notifications</a>
              <a className={styles.navLink} href="#">Messages</a>
            </nav>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.searchContainer}>
              <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
              <input 
                className={styles.searchInput}
                placeholder="Search Nexus"
                type="text"
              />
            </div>
            <button className={styles.settingsButton}>
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div 
              className={styles.userAvatar}
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGKoOpfs-M5T0-oMbs84Pn6a1oq81cSn7J-XuSxfuo8aKyi1nr7gNEo22hlPeXm7J_wAl6rZ894g1zjF6aU828_HJVvr2MtfwzS8CDp8dRDMcCrLMcGZZCG1pBA_1BjL79k_-BhfpeUpsKOBhsXc7WCNH-OHzbrZX9iW1wy1lmAzWexqU3-Ih75jar5mwBLILOTZpJnmVfNcPSMcz6r8DhKFbL2BAstGQtxZTGmIxYZDS7aPP9IunauMuqFYim9Ff1XlEtcu-NbxLl")' }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Page Title */}
          <div className={styles.pageTitleSection}>
            <h1 className={styles.pageTitle}>Notifications</h1>
            <button className={styles.markAllReadButton}>Mark all as read</button>
          </div>

          {/* Filters */}
          <div className={styles.filtersContainer}>
            <div className={styles.filtersWrapper}>
              <button className={`${styles.filterButton} ${styles.filterButtonActive}`}>All</button>
              <button className={`${styles.filterButton} ${styles.filterButtonInactive}`}>Mentions</button>
              <button className={`${styles.filterButton} ${styles.filterButtonInactive}`}>Requests</button>
            </div>
          </div>

          {/* Notifications List */}
          <div className={styles.notificationsList}>
            {/* Notification Item: Like */}
            {/* <div className={styles.notificationItem}>
              <div className={styles.avatarContainer}>
                <div 
                  className={styles.avatar}
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcA2prmYT3s_Vf840DqFuBaQHO_TfgQGE4fBbOxFn5hEFUL1ptpw4h63s8-cJ3-lboJjUlxAzkeZd5GNXviULhq476jFHfOncFbus7LqXxZAwCSOC17YioBZOvP0b47jSBFhyl1IsaVk9Q0Zm9_M4sFjcTScObmLtjLuBb8yVNjXX1gbLHIXMXNTzpyR1DM-eY3WTnP8huyw_Fd3xWgS1_GYKl90kX0ZSDH6vG8NdMxndL4u71196aet2JOzX9hDDD9y56pPbZfRl4")' }}
                ></div>
                <div className={`${styles.iconBadge} ${styles.iconBadgeRed}`}>
                  <span className="material-symbols-outlined">favorite</span>
                </div>
              </div>
              <div className={styles.notificationContent}>
                <p className={styles.notificationText}>
                  <span className={styles.notificationTextHighlight}>Alex Rivera</span> liked your photo 
                  <span className={styles.notificationTime}>2m ago</span>
                </p>
              </div>
              <div className={styles.notificationActions}>
                <div 
                  className={styles.notificationThumbnail}
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGswVJWycNQTULm2Xi3VAOb4EOVq42JPSCaPsgLXPqZ-Q_VHiTk1KSTV-NGhtNZ7sPdrzXg1V0JiO7hz_NmAPCM2I9k3FdckLLD7mwWF3RAMoW91qpEsKRQgFx3f6j5nXTl-DrQQuC4TCLTlEpMlKDHJx_IFkx1mdgF5S8P8Z9DWOLzcxvzu8KeJw8eXaOuLXLlybNoTiol5ZOOf4Rtmiz1iGWK1hcGXDQ93Gq5Y4cLlMgiMQV_Wj6XstD2xeGnlGCTmhTfW2SuAMp")' }}
                ></div>
                <div className={styles.unreadDot}></div>
              </div>
            </div> */}

            {/* Notification Item: Follow */}
            {notifications.map((notification) => (
                <div 
                    key={notification.id}
                    className={styles.notificationItem}
                >
                    <div className={styles.avatarContainer}>
                    <div 
                        className={styles.avatar}
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgc5MktuH5oBeGvrf8K-QTPjIRfFxdO9b6qQGv9yCIKG9wKs2o8mNgKtxKtVtcAGZtvOJIHCEt73NLzKLJqoptq2SJTtLEbA7XgDk_m011o8p20byZEPO6jupqavKMe0EpjrMnxtfwedsn3aCDv9VzTfVfzHz07EVMaRADQNcWS9-_YRK7rNJe9WTHaIUYU7KdWTDKwtLPhMAnExs1jYSA7cZlQsaGobNzzyQQ3D-y7hzFMe4eBN4I4uCDhoyRSNVPNynMlfi7WHFd")' }}
                    ></div>
                    {/* <div className={`${styles.iconBadge} ${styles.iconBadgePrimary}`}>
                        <span className="material-symbols-outlined">person_add</span>
                    </div> */}
                    </div>
                    <div className={styles.notificationContent}>
                    <p className={styles.notificationText}>
                        <span 
                            className={styles.notificationTextHighlight}
                            onClick={() => { navigate(`/user/${notification.sender}`) }}
                        >
                            {notification.sender}
                        </span>
                        
                        {notification.description}
                        
                        <span className={styles.notificationTime}>{new Date(notification.created_at).toLocaleString()}</span>
                    </p>
                    </div>
                    <div className={styles.notificationActions}>
                    <button className={styles.followButton}>
                        Follow Back
                    </button>
                    <div className={styles.unreadDot}></div>
                    </div>
                </div>

            ))}
            
            {/* Notification Item: Comment */}
            {/* <div className={`${styles.notificationItem} ${styles.notificationItemColumn}`}>
              <div className={styles.notificationItemRow}>
                <div className={styles.avatarContainer}>
                  <div 
                    className={styles.avatar}
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuGQiAupowF10RS5FHoEkMbbVYZlerHO9n-uQrtIpJNUf1LsV0k91PlaF86aR99ItTsFL8OZz9Oql5aH5bHkXKpeXJe58T4h5e8k4mxk_IhF_kly424bthCs-DXTqlDgFeMoVKInbBnDqNIRa3xKuZiP2Y1VQEPoCbyJYz7D2jByoQUQW1E42ZA4OlMJ3D_TPyMSX7DFoQ9WjJomsvO_ebVuaXsxr27Dec1XPyVl-QfV5DlsWBPNmVVsy0bKiCw-KYQBroSxYVa148")' }}
                  ></div>
                  <div className={`${styles.iconBadge} ${styles.iconBadgeBlue}`}>
                    <span className="material-symbols-outlined">chat_bubble</span>
                  </div>
                </div>
                <div className={styles.notificationContent}>
                  <p className={styles.notificationText}>
                    <span className={styles.notificationTextHighlight}>Sarah Chen</span> commented on your post
                    <span className={styles.notificationTime}>3h ago</span>
                  </p>
                </div>
              </div>
              <div className={styles.commentPreview}>
                <p className={styles.commentText}>
                  "This looks amazing! Where was this photo taken? I've been looking for a spot like this for months."
                </p>
              </div>
            </div> */}

            {/* Notification Item: Mention */}
            {/* <div className={styles.notificationItem}>
              <div className={styles.avatarContainer}>
                <div 
                  className={styles.avatar}
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAaDDc5IaV8OK3AjZ-8cB1Sa8-clIe9pLpp7cWcglOH7NH-kOTiyTvneGq5I22PKd678WsEwbz_KmiyUcGENLRBiKolMpNNN2s5eZZFCkPc3U4XuQuKC7GYwacywKnjaibYa7Y3Q56IHNRyxf9eJ4mObf2y23UC9PRHK0WmnrdOZ89lR0FfzI0IXfVcKN_kdJ7zpEf3xCX6fqmjI9fddb3CaU7nxi3fouD-vmRz2DTpzC-_nB5u3Kkrn06qc5hYPdlGyPqWQwqG1QOJ")' }}
                ></div>
                <div className={`${styles.iconBadge} ${styles.iconBadgeAmber}`}>
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
              </div>
              <div className={styles.notificationContent}>
                <p className={styles.notificationText}>
                  <span className={styles.notificationTextHighlight}>Marcus Aurelius</span> mentioned you in a comment
                  <span className={styles.notificationTime}>Yesterday</span>
                </p>
              </div>
              <div className={styles.notificationActions}>
                <button className={styles.moreOptionsButton}>
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
            </div> */}

            {/* Notification Item: Request */}
            {/* <div className={styles.notificationItem}>
              <div className={styles.avatarContainer}>
                <div 
                  className={styles.avatar}
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDk_K6mgnodxweCdxvQw4RcP7OQRQAk44123P-gzVn08jJbPA7GEu-024r-gt-RfGwMNFAJXRwUN_GzGdr4o1DPzaUlB0BEYUPRfCpdOsTL8oB9OSElv2LRQHoF7zDV7kuICCK2ytJwp11qDsUatU5BRMXyKZJtcbk3Z1fd8t6on3fprPrS4pUKiiG0lOdAxSWmSVRjXnZSCGcxDbPa85cXM-w78D5-mG8wEN20v9H2xzu5WRbgEATksuEKtULEMgN3GS_jw60lk8ij")' }}
                ></div>
                <div className={`${styles.iconBadge} ${styles.iconBadgePurple}`}>
                  <span className="material-symbols-outlined">lock</span>
                </div>
              </div>
              <div className={styles.notificationContent}>
                <p className={styles.notificationText}>
                  <span className={styles.notificationTextHighlight}>Elena Gilbert</span> requested to join your private circle <span className={styles.notificationTextPrimary}>"Design Visionaries"</span>
                  <span className={styles.notificationTime}>Yesterday</span>
                </p>
              </div>
              <div className={styles.requestButtons}>
                <button className={styles.acceptButton}>
                  Accept
                </button>
                <button className={styles.declineButton}>
                  Decline
                </button>
              </div>
            </div> */}
          </div>

          {/* Load More / End of list */}
          <div className={styles.loadMoreSection}>
            <div className={styles.loadMoreIcon}>
              <span className="material-symbols-outlined">expand_more</span>
            </div>
            <p className={styles.loadMoreText}>You're all caught up!</p>
          </div>
        </div>
      </main>

      {/* Floating Action Button (Mobile Only) */}
      <button className={styles.floatingActionButton}>
        <span className="material-symbols-outlined">edit</span>
      </button>
    </div>
  );
};

export default NotificationPage;