# Round 1 Demo Plan

**Duration:** 3–5 minutes
**Objective:** Clearly demonstrate the core Namma Space Round 1 requirement: creating a 3D digital copy of an indoor space and making it interactive on a website.

## Scene 1: Introduction and The Physical Space (0:00 - 0:45)
- **Visuals:** Start with a brief title screen ("Namma Space - Round 1"). Cut to the raw `second_capture.mp4` video.
- **Narration/Text:** Briefly introduce the problem statement. Explain that this is the physical hostel room we chose to reconstruct. Note the challenges (reflective cupboards, plain walls).
- **Key Point:** Prove that we started with a real, physical indoor space.

## Scene 2: The Technical Pipeline (0:45 - 1:45)
- **Visuals:** Show a fast-forwarded recording or diagram of the pipeline.
  - Frame extraction (show the Python script running and the generated `Reconstruction/frames/`).
  - Reconstruction processing (show a diagram of 3D Gaussian Splatting / COLMAP).
  - Optimization (mention how the raw file was compressed for the web).
- **Narration/Text:** Briefly explain *how* the 2D video becomes a 3D asset without getting bogged down in math. Mention why 3D Gaussian Splatting was chosen over meshes (for realism and reflection handling).

## Scene 3: The Web Viewer Experience (1:45 - 3:30)
- **Visuals:** Switch to a screen recording of the deployed web viewer.
  - Refresh the page to show the loading screen ("Loading Environment").
  - Once loaded, perform a slow, smooth camera pan around the reconstructed room.
  - Zoom in on specific details (e.g., the bedsheet pattern, the cupboards) to show the visual fidelity.
  - Click the "Fullscreen" button and demonstrate interactive exploration (Orbiting).
  - Click the "Reset" button to return to the original camera position.
- **Narration/Text:** Highlight the UI/UX. Emphasize that the user is exploring this completely in a web browser without plugins. Call attention to the smooth interactions and high frame rate.

## Scene 4: Future Scope & Conclusion (3:30 - 4:00)
- **Visuals:** Return to the UI, maybe overlay some text showing "Round 2 Scope: POIs, Navigation, Search".
- **Narration/Text:** Conclude by summarizing that the foundation is now built. In the next round, we will add semantic data (POIs) and pathfinding algorithms on top of this 3D environment.
- **End Screen:** Team Name, repository link, and viewer URL.
