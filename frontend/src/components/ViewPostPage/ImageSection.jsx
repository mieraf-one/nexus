import { useState } from 'react';
import styles from '../../pages/css/ViewPostPage.module.css'

function ImageSection({ photo }) {
    const [isPostPhotoOpen, setIsPostPhotoOpen] = useState(false);
    const [zoom, setZoom] = useState(1);

    return (
        <>
            <div className={styles.imageSection}>
                <img 
                    src={`${photo}`} 
                    className={styles.postImage}
                    onClick={() => {
                    setIsPostPhotoOpen(true);
                    }}
                />
                <button className={styles.navButtonLeft}>
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className={styles.navButtonRight}>
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>

            {isPostPhotoOpen && (
                <div className={styles.overlay} onClick={() => {setIsPostPhotoOpen(false); setZoom(1);}}>
                    <img
                        src={photo}
                        className={styles.fullImage}
                        style={{ transform: `scale(${zoom})` }}
                        onClick={(e) => e.stopPropagation()}
                        onWheel={(e) => {
                        e.preventDefault();
                        setZoom((z) =>
                            Math.min(3, Math.max(1, z + e.deltaY * -0.001))
                        );
                        }}
                    />
                </div>
            )}
        </>
    )
}


export default ImageSection;