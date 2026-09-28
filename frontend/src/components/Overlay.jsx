import React from 'react';
import { Maximize, RotateCcw, Info } from 'lucide-react';

const Overlay = () => {
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleReset = () => {
    window.dispatchEvent(new CustomEvent('resetCamera'));
  };

  return (
    <div className="overlay-container pointer-events-none">
      <div className="overlay-header">
        <h1>Namma Space</h1>
        <p>Interactive 3D Digital Twin</p>
      </div>
      
      <div className="overlay-controls pointer-events-auto">
        <button onClick={handleReset} title="Reset Camera" className="control-btn">
          <RotateCcw size={20} />
        </button>
        <button onClick={handleFullscreen} title="Toggle Fullscreen" className="control-btn">
          <Maximize size={20} />
        </button>
      </div>

      <div className="overlay-footer">
        <Info size={16} />
        <span>Use mouse/touch to rotate, pan, and zoom.</span>
      </div>
    </div>
  );
};

export default Overlay;
