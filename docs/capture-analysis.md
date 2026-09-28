# Capture Analysis

## Overview
This document analyzes the input capture video (`second_capture.mp4`) to determine its suitability for 3D reconstruction and to plan the preprocessing and reconstruction pipeline.

## Video Metadata
- **Approximate Duration:** 31.3 seconds
- **Resolution:** 1024x576
- **Frame Rate:** 30 FPS
- **Total Frames:** 939

## Visual Assessment
- **Camera Movement:** The camera performs a continuous, handheld sweep across the room.
- **Camera Stability:** The movement is generally smooth but exhibits the typical slight jitter of a handheld capture.
- **Indoor-space Coverage:** The capture covers a single small hostel/dorm room, capturing a bed, a window with curtains, two metal cupboards, an AC unit, clothes hanging on a wall peg, and a wooden door.
- **Lighting Conditions:** The room is illuminated by artificial indoor lighting (tube light). The lighting is adequate, though some areas cast shadows, and the window appears dark (nighttime).
- **Visible Surfaces:** Key surfaces include textured/patched green walls, patterned bedsheets, reflective metal cupboards, and a plain wooden door. The floor is mostly obscured by objects and the bed.
- **Repeated Viewpoints:** The capture is primarily a single progressive sweep, offering continuous overlap between adjacent frames, but may lack multi-angle revisit views of the same objects.
- **Visual Overlap:** High sequential overlap due to the 30 FPS capture rate during a relatively slow pan.
- **Motion Blur:** Minor motion blur is expected during faster panning motions, given the indoor lighting conditions and standard frame rate.

## Reconstruction Feasibility
- **Strengths of the capture:** 
  - The patterned bedsheet, clothes, and wall textures (including damp spots) provide excellent distinct visual features for feature matching and camera alignment.
  - The continuous, relatively slow camera movement ensures good overlap between sequential frames.
- **Weaknesses of the capture:**
  - The metal cupboards are large, reflective/specular surfaces, which are notoriously difficult for traditional photogrammetry.
  - Large sections of plain green wall lack distinct features.
  - The resolution (1024x576) is on the lower side, which may limit the sharpness of the final textures.
- **Potential reconstruction problems:** Specular highlights on the metal cupboards may result in holes or distorted geometry. Featureless wall areas may fail to reconstruct densely.

## Recommendations
- **Recommended Preprocessing:**
  - Extract frames at approximately 3 to 5 frames per second (e.g., every 6th to 10th frame) to ensure a wide enough baseline between viewpoints while maintaining sufficient overlap.
  - Discard excessively blurred frames to improve camera tracking accuracy.
- **Recommended Reconstruction Strategy:**
  - **Gaussian Splatting** is highly recommended over traditional mesh-based photogrammetry for this dataset. Gaussian Splatting handles specular reflections (metal cupboards) and featureless walls much better, and provides superior visual quality for complex indoor scenes.
  - If a mesh is strictly required, a NeRF-to-mesh or a robust photogrammetry pipeline (like COLMAP + OpenMVS) with aggressive filtering would be needed, but Gaussian Splatting will yield a more convincing "digital twin" for a web viewer.
