import React from 'react';
import styles from './Css/LoadingSpinner.module.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  label = 'Loading...',
  fullScreen = false,
  overlay = false 
}) => {
  const sizeClass = styles[size];
  const colorClass = styles[color];
  
  const spinnerContent = (
    <div className={`${styles.spinnerContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      {overlay && <div className={styles.overlay}></div>}
      <div className={`${styles.spinnerWrapper} ${fullScreen ? styles.centered : ''}`}>
        <div className={`${styles.spinner} ${sizeClass} ${colorClass}`}>
          <div className={styles.spinnerInner}>
            <div className={styles.spinnerSegment}></div>
            <div className={styles.spinnerSegment}></div>
            <div className={styles.spinnerSegment}></div>
            <div className={styles.spinnerSegment}></div>
            <div className={styles.spinnerSegment}></div>
            <div className={styles.spinnerSegment}></div>
            <div className={styles.spinnerSegment}></div>
            <div className={styles.spinnerSegment}></div>
          </div>
        </div>
        {label && <span className={styles.label}>{label}</span>}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreenContainer}>
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

// Dot Spinner Variant
export const DotSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  label = '',
  fullScreen = false,
  overlay = false 
}) => {
  const sizeClass = styles[`dotSize-${size}`];
  const colorClass = styles[`dotColor-${color}`];
  
  const spinnerContent = (
    <div className={`${styles.spinnerContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      {overlay && <div className={styles.overlay}></div>}
      <div className={`${styles.dotSpinnerWrapper} ${fullScreen ? styles.centered : ''}`}>
        <div className={`${styles.dotSpinner} ${sizeClass} ${colorClass}`}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
        {label && <span className={styles.label}>{label}</span>}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreenContainer}>
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

// Pulse Spinner Variant
export const PulseSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  label = 'Loading...',
  fullScreen = false,
  overlay = false 
}) => {
  const sizeClass = styles[`pulseSize-${size}`];
  const colorClass = styles[`pulseColor-${color}`];
  
  const spinnerContent = (
    <div className={`${styles.spinnerContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      {overlay && <div className={styles.overlay}></div>}
      <div className={`${styles.pulseSpinnerWrapper} ${fullScreen ? styles.centered : ''}`}>
        <div className={`${styles.pulseSpinner} ${sizeClass} ${colorClass}`}></div>
        {label && <span className={styles.label}>{label}</span>}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreenContainer}>
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

// Ring Spinner Variant (Simple)
export const RingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  label = 'Loading...',
  fullScreen = false,
  overlay = false 
}) => {
  const sizeClass = styles[`ringSize-${size}`];
  const colorClass = styles[`ringColor-${color}`];
  
  const spinnerContent = (
    <div className={`${styles.spinnerContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      {overlay && <div className={styles.overlay}></div>}
      <div className={`${styles.ringSpinnerWrapper} ${fullScreen ? styles.centered : ''}`}>
        <div className={`${styles.ringSpinner} ${sizeClass} ${colorClass}`}></div>
        {label && <span className={styles.label}>{label}</span>}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreenContainer}>
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;