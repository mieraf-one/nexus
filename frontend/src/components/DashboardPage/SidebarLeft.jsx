import { useNavigate } from "react-router-dom";
import styles from "../../pages/css/DashboardPage.module.css"

const SidebarLeft = () => {
  const navigate = useNavigate();

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
      
      <button 
          className={styles.createPostBtn}
          onClick={() => {navigate('/create')}}
      >
        <span className="material-symbols-outlined">add_circle</span>
        Create New Post
      </button>
    </aside>
  );
};


export default SidebarLeft;