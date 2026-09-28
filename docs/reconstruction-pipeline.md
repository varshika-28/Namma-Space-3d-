# Reconstruction Pipeline

## 1. Selected Approach: 3D Gaussian Splatting (3DGS)
We have selected **3D Gaussian Splatting (3DGS)** as the reconstruction method for this digital twin project.

### Why this approach was selected:
- **Visual Fidelity:** Gaussian Splatting provides unparalleled photorealism for complex indoor environments compared to traditional mesh-based photogrammetry.
- **Handling of Reflections:** The capture features large metal cupboards. Traditional photogrammetry struggles with specular reflections, often resulting in holes or mangled geometry. 3DGS models view-dependent effects natively.
- **Handling of Featureless Areas:** Plain walls (like the green walls in the capture) often fail to reconstruct in traditional meshes but are handled smoothly by 3DGS.
- **Web Compatibility:** With modern WebGL libraries (such as `gsplat.js` or `react-three-fiber` integrations), Gaussian Splats can be rendered at high framerates in the browser.

## 2. Required Preprocessing
The input is a continuous MP4 video. We cannot feed raw video directly into most reconstruction tools without extracting it into discrete images.
- **Frame Extraction:** Extract frames from the video.
- **Blur Detection (Optional but recommended):** Filter out heavily motion-blurred frames.

## 3. Frame Extraction Strategy
- **Extraction Rate:** We will extract frames at approximately 3 frames per second (FPS). Given the 30 FPS source video, this means extracting every 10th frame.
- **Reasoning:** 3 FPS provides a sufficiently wide baseline between camera poses for accurate Structure-from-Motion (SfM) matching, while keeping the total number of images manageable (around 90-100 images for a 31-second video). Redundant frames (e.g., extracting all 30 FPS) slow down processing without significantly improving quality and can even degrade camera pose estimation.

## 4. Reconstruction Process
The reconstruction process requires a CUDA-enabled GPU and consists of two main steps:
1. **Structure from Motion (SfM):** Use COLMAP to estimate camera poses and generate a sparse point cloud from the extracted frames.
2. **Splat Training:** Use a 3D Gaussian Splatting framework (e.g., Nerfstudio's `splatfacto` or the original Inria implementation) to train the 3D Gaussians over the calibrated images.

*(Note: Due to the lack of a dedicated high-end GPU in the current automated environment, this specific training step must be executed on compatible hardware, or an API service like Luma AI can be used as an alternative).*

## 5. Output Format
The raw output of the training process is a `.ply` file containing millions of colored, oriented Gaussians.

## 6. Web Optimization Process
Raw `.ply` splat files can exceed 100MB-500MB, which is too large for fast web delivery. Optimization involves:
- **Pruning:** Removing Gaussians with near-zero opacity or those far outside the bounding box of the room.
- **Compression:** Converting the `.ply` to a compressed `.splat` format (a streamlined binary format used by WebGL splat viewers) which drastically reduces file size.
- **Spatial Sorting:** Pre-sorting Gaussians to improve rendering performance.

## 7. Web Viewer Loading Strategy
- The frontend will be built with **React** and **Vite**.
- We will use **Three.js** along with a specialized Gaussian Splat loader (like `@react-three/drei`'s `Splat` component, or `gsplat.js` integrated into React).
- The optimized `.splat` file will be served statically from the `public/models/` directory.
- A progress loader will be displayed while the binary asset downloads, and upon completion, the user will be presented with orbit controls to navigate the space.
