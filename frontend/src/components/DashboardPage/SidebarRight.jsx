import { useNavigate, Link } from "react-router-dom";
import { getUsername } from "../../utils/token";
import { useContext, useEffect, useState } from "react";
import path from "../../utils/apiEndPoints";
import { getReq, followUser, unFollowUser } from "../../utils/utils";
import styles from "../../pages/css/DashboardPage.module.css"
import { DotSpinner } from "../LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";


const SidebarRight = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [suggestAccounts, setSuggestAccounts] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  

  useEffect(() => {
    // console.log('useEffect run')
    const fetchSuggestions = async () => {
      try {
        setLoading(true);

        const userUsername = getUsername();

        if (!userUsername) {
            navigate('/login');
        }

        const userData = await getReq(path.profile(userUsername));
        // console.log(userData)
        setUser(userData)

        const suggestAccountsData = await getReq(path.followSuggestions);
        console.log(suggestAccountsData)
        setSuggestAccounts(suggestAccountsData.results);

      } catch (error) {
        console.log('sidebar right error')
        console.log(error.code);
        // console.log(error.message);
         if (error.code == 401) {
            logout;
            navigate('/login');
            return;
         }

      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, [])

  const handleFollowUser = async (id) => {
    const prevState = suggestAccounts;

    try {
        // immediate follow button
        setSuggestAccounts(prevState.map((user) => {
            if (user.id == id) {
            return {...user, is_following: !user.is_following};
            }
            return user;
        }))
        
        await followUser(id);

      
    } catch (error) {
        // if error rollback the button state
        setSuggestAccounts(prevState);
    
        console.log('sidebar right: handle follow error')
        console.log(error.message)

        if (error.code == 401) {
          logout;
          navigate('/login');
          return;
        }
    }
  }

  const handleUnFollowUser = async (id) => {
    const prevState = suggestAccounts;

    try {
        setSuggestAccounts(prevState.map((user) => {
            if (user.id == id) {
            return {...user, is_following: !user.is_following};
            }
            return user;
        }))

        await unFollowUser(id);

      
    } catch (error) {
        setSuggestAccounts(prevState);
        console.log('sidebarRight: handle unfollow user error')
        console.log(error.message)

        console.log(error.code);
        if (error.code == 401) {
          logout;
          navigate('/login');
          return;
      }
    }
  }

  return (
    <aside className={styles.sidebarRight}>
      {loading
      ?
        <DotSpinner />
      :
      <>
        {/* Account Avatar */}
        <Link to={`/user/${user.username}`} className={styles.profileCard}>
            <div className={styles.profileAvatar}>
            <div 
                className={styles.avatarImage}
                style={{ backgroundImage: `url(${user.profile_picture})` }}
            />
            <div className={styles.onlineIndicator}></div>
            </div>
            <div className={styles.profileInfo}>
            <h3 className={styles.profileName}>{user?.first_name}</h3>
            <p className={styles.profileHandle}>@{user?.username}</p>
            </div>
            <span className={`material-symbols-outlined ${styles.chevron}`}>chevron_right</span>
        </Link>
      </>
      }
      
      {loading 
      ?
      <DotSpinner />
      :
        <>
            {/* Friends Suggestions */}
            <div className={styles.friendsCard}>

                {/* friends suggestion title */}
                <div className={styles.friendsHeader}>
                    <h3 className={styles.friendsTitle}>Friend Suggestions</h3>
                    <button className={styles.seeAllBtn}>See all</button>
                </div>
                
                {/* Accounts with username */}
                <div className={styles.friendsList}>
                {suggestAccounts.map((user) => (
                    <div key={user.id} className={styles.friendItem}>
                        <div className={styles.friendInfo}>
                            <div 
                                className={styles.friendAvatar}
                                style={{ backgroundImage: `url(${user.profile_picture})` }}
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
        </>
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


export default SidebarRight;