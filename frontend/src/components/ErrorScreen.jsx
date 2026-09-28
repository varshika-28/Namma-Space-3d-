import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorScreen = ({ message }) => {
  return (
    <div className="error-screen">
      <div className="error-content">
        <AlertTriangle size={64} className="error-icon" />
        <h2>Failed to Load Digital Twin</h2>
        <p>{message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;
