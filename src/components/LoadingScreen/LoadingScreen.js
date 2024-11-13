import React from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = () => {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingScreen;