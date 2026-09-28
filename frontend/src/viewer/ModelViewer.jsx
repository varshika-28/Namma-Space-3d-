import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';
import Scene from './Scene';

const ProgressNotifier = ({ onProgress, onLoaded }) => {
  const { progress, active } = useProgress();
  
  useEffect(() => {
    onProgress(progress);
    if (!active && progress >= 100) {
      // Small delay to ensure smooth transition
      setTimeout(() => onLoaded(), 500);
    }
  }, [progress, active, onProgress, onLoaded]);
  
  return null;
};

// Error Boundary for WebGL/Canvas issues
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const ModelViewer = ({ onLoaded, onError, onProgress }) => {
  const controlsRef = useRef();

  useEffect(() => {
    const handleReset = () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    };
    window.addEventListener('resetCamera', handleReset);
    return () => window.removeEventListener('resetCamera', handleReset);
  }, []);

  return (
    <div className="canvas-container">
      <ErrorBoundary onError={onError}>
        <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
          <color attach="background" args={['#1a1a1a']} />
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          
          <Suspense fallback={<ProgressNotifier onProgress={onProgress} onLoaded={onLoaded} />}>
            <Scene onError={onError} onLoaded={onLoaded} />
          </Suspense>
          
          <OrbitControls 
            ref={controlsRef}
            makeDefault 
            enableDamping 
            dampingFactor={0.05}
            minDistance={1}
            maxDistance={50}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default ModelViewer;
