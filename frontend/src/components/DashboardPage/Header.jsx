import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../../utils/apiEndPoints";
import { getReq } from "../../utils/utils";
import styles from "../../pages/css/DashboardPage.module.css"
import { getUsername } from "../../utils/token";


const Header = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleSearch = async (value) => {
    try {
        const res = await getReq(path.searchUser(value))
        // console.log(res);
        setUsers(res);
    } catch (err) {
      // console.log(err.message);
    }
  }

  const handleGoProfile = () => {
    const userUsername = getUsername();
    navigate(`/user/${userUsername}`);
    return;
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
                    
                ))}                
                
                <a href="#" className={styles.dropdownSeeAll}>
                  See all results
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.userSection} onClick={handleGoProfile}>
          <div className={styles.userProfile}>
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


export default Header;