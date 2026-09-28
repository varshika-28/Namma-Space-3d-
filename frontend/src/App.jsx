import React, { useState } from 'react';
import ModelViewer from './viewer/ModelViewer';
import Overlay from './components/Overlay';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleLoaded = () => {
    setLoading(false);
  };

  const handleError = (err) => {
    setError(err.message || 'Failed to load the 3D model.');
    setLoading(false);
  };

  const handleProgress = (prog) => {
    setProgress(prog);
  };

  return (
    <div className="app-container">
      {error ? (
        <ErrorScreen message={error} />
      ) : (
        <>
          {loading && <LoadingScreen progress={progress} />}
          <ModelViewer 
            onLoaded={handleLoaded} 
            onError={handleError} 
            onProgress={handleProgress} 
          />
          <Overlay />
        </>
      )}
    </div>
  );
}

export default App;
