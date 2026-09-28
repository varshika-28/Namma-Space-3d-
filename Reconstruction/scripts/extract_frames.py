import cv2
import os
import argparse

def extract_frames(video_path, output_dir, frame_interval=10):
    """
    Extracts frames from a video at a specified interval.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Could not open video {video_path}")
        return

    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    print(f"Video loaded: {frame_count} frames at {fps} FPS.")
    print(f"Extracting every {frame_interval}th frame to {output_dir}...")

    count = 0
    extracted = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if count % frame_interval == 0:
            frame_filename = os.path.join(output_dir, f"frame_{extracted:04d}.jpg")
            # Save frame with high JPEG quality (95) to preserve details for reconstruction
            cv2.imwrite(frame_filename, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
            extracted += 1

        count += 1

    cap.release()
    print(f"Done! Extracted {extracted} frames.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract frames from video for 3D reconstruction.")
    parser.add_argument("--video", type=str, default="../input/second_capture.mp4", help="Path to input video")
    parser.add_argument("--out", type=str, default="../frames", help="Output directory for frames")
    parser.add_argument("--interval", type=int, default=10, help="Extract every Nth frame")
    
    args = parser.parse_args()
    
    # Resolve paths relative to script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    video_path = os.path.join(script_dir, args.video)
    output_dir = os.path.join(script_dir, args.out)
    
    extract_frames(video_path, output_dir, args.interval)
