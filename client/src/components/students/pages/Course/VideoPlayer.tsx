import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>();

  useEffect(() => {
    let player: any | undefined;

    const initializePlayer = () => {
      if (videoRef.current) {
        player = videojs(videoRef.current, {
          autoplay: true,
          controls: true, // Enable default controls
          sources: [{ src }],
        });
        playerRef.current = player;
      }
    };

    const script = document.createElement('script');
    script.src = 'https://vjs.zencdn.net/7.15.4/video.js';
    script.async = true;
    script.onload = initializePlayer;

    document.body.appendChild(script);

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = undefined;
      }
      document.body.removeChild(script);
    };
  }, [src]);

  const handleBackward = () => {
    if (playerRef.current) {
      playerRef.current.currentTime(playerRef.current.currentTime() - 10);
    }
  };

  const handleForward = () => {
    if (playerRef.current) {
      playerRef.current.currentTime(playerRef.current.currentTime() + 10);
    }
  };

  return (
    <div className="relative h-full">
      <video ref={videoRef} className="video-js vjs-default-skin  h-full w-full" />
    </div>
  );
};

export default VideoPlayer;
