# Web Optimization

Since the 3D reconstruction asset (e.g., a Gaussian Splat `.ply` or `.splat` file, or a textured mesh `.glb`) can be very large (often 100MB+ for a single room), it must be optimized before deployment to ensure the web viewer remains responsive and loads in a reasonable time.

## Optimization Steps

### 1. Geometric & Splat Pruning
- **Gaussian Splatting:** Remove Gaussians with opacity below a certain threshold (e.g., < 0.05). Remove Gaussians that fall outside the immediate bounding box of the target room (e.g., sky, distant artifacts).
- **Mesh/Photogrammetry:** Perform decimation (mesh simplification) to reduce the polycount from millions of polygons to a web-friendly target (e.g., < 200,000 polygons) while preserving UV boundaries and sharp edges.

### 2. Texture & Color Compression
- **Mesh:** Bake textures into WebP or KTX2 formats to reduce VRAM usage. KTX2 allows textures to remain compressed on the GPU.
- **Splatting:** Convert Spherical Harmonics (SH) bands to lower precision (e.g., FP16 instead of FP32) or drop higher-order SH bands entirely if view-dependent lighting is less critical, which drastically reduces file size.

### 3. Format Conversion
- **Mesh:** Export to `.glb` (glTF Binary) which bundles the geometry and textures into a single efficient file.
- **Splatting:** Convert the raw `.ply` file to a compressed `.splat` format. The `.splat` format packs position, scale, color, and rotation into 32 bytes per splat, reducing the size by up to 70% compared to `.ply`.

### 4. Spatial Sorting (Pre-computation)
- For Gaussian splats, pre-computing the spatial morton order or octree structure allows the web viewer to skip the initial expensive sorting step upon loading, significantly improving the "time to first frame".

## Current Optimization Status
The actual optimization step is pending the completion of the 3D reconstruction step on GPU hardware. Once the raw model is generated, these optimizations will be applied via automated scripts (e.g., `splat-compress` or Blender Python scripts for meshes) before placing the final asset into `frontend/public/models/`.
