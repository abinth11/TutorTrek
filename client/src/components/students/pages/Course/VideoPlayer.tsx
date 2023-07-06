import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  videoKey: string | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoKey }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>();

  useEffect(() => {
    let player: any | undefined;
    const initializePlayer = () => {
      if (videoRef.current) {
        player = videojs(videoRef.current, {
          controls: true,
        });
        playerRef.current = player;

        player.src({
          src: `https://d2vf4943yf4h7g.cloudfront.net/${videoKey}`,
          type: "video/mp4", // Update the MIME type to video/mp4
        });
      }
    };
    const script = document.createElement("script");
    script.src = "https://vjs.zencdn.net/7.15.4/video.js";
    script.async = true;
    script.onload = initializePlayer;

    document.body.appendChild(script);

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = undefined;
      }
      document.body.removeChild(script);
    };
  }, [videoKey]);

  return (
    <div className='relative h-full'>
      <video
        ref={videoRef}
        className='video-js vjs-default-skin h-full w-full'
      />
    </div>
  );
};

export default VideoPlayer;
