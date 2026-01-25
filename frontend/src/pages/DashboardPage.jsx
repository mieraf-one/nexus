import Header from '../components/DashboardPage/Header';
import MainContent from '../components/DashboardPage/Main';
import SidebarRight from '../components/DashboardPage/SidebarRight';
import SidebarLeft from '../components/DashboardPage/SidebarLeft';

import styles from './css/DashboardPage.module.css';


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