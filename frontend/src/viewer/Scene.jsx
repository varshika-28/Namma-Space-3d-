import React, { useEffect, useState } from 'react';
import { useTexture, Text, Grid, Center } from '@react-three/drei';
import * as THREE from 'three';

// This is a textured placeholder using a frame extracted from the actual video capture.
const PlaceholderRoom = () => {
  const texture = useTexture('/models/room_texture.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;
  // Flip the texture on X so it looks correct when viewed from the inside
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        {/* Create an inward-facing cylinder (open on top/bottom) to simulate the room walls */}
        <cylinderGeometry args={[5, 5, 4, 32, 1, true, 0, Math.PI * 1.5]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[5, 5, 0.1, 32]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      
      <Center position={[0, 0, -2]}>
        <Text
          position={[0, 0, 0]}
          color="#ffffff"
          fontSize={0.2}
          maxWidth={3}
          textAlign="center"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {`MOCK 3D VIEW\n(Texture mapped from video frame 45)\n\nA true 3D digital twin requires GPU processing.`}
        </Text>
      </Center>
      <Grid infiniteGrid fadeDistance={20} sectionColor="#666" cellColor="#333" position={[0, -1.9, 0]} />
    </group>
  );
};

const Scene = ({ onError, onLoaded }) => {
  useEffect(() => {
    // Notify app that loading is complete
    const timer = setTimeout(() => {
      onLoaded();
    }, 500);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return <PlaceholderRoom />;
};

export default Scene;
