import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = ({ progress }) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <Loader2 className="spinner" size={48} />
        <h2>Loading Environment</h2>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${Math.max(5, progress)}%` }}
          ></div>
        </div>
        <p>{progress.toFixed(0)}% Complete</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
