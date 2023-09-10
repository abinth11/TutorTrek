import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import {useParams,useNavigate} from "react-router-dom";

interface VideoPlayerProps {
  videoKey: string | null;
  isCoursePurchased: boolean|null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoKey,
  isCoursePurchased,                 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>();
  const {courseId} = useParams()
  const navigate = useNavigate()

  const handleClick = ()=>{
    navigate(`/courses/${courseId}`)
  }
 console.log(`https://d2vf4943yf4h7g.cloudfront.net/${videoKey}`)
  useEffect(() => {
    let player: any | undefined;
    const initializePlayer = () => {
      if (videoRef.current) {
        player = videojs(videoRef.current, {
          controls: true,
        });
        playerRef.current = player;

        if (isCoursePurchased) {
          player.src({
            src: `https://d2vf4943yf4h7g.cloudfront.net/${videoKey}`,
            type: "video/mp4", // Update the MIME type to video/mp4
          });
        } else {
          showPurchaseOverlay()
        }
      }
    };

    const showPurchaseOverlay = () => {
      const purchaseOverlay = (
        <div className='purchase-overlay pt-16 flex items-center justify-center'>
          <div className='text-center '>
            <div className='lock-icon w-20 h-20 bg-black bg-center bg-cover mx-auto'></div>
            <h2 className='text-2xl font-semibold mt-4'>
              This video is locked
            </h2>
            <p className='text-lg text-gray-600 mt-2'>
              Please purchase the course to unlock the content
            </p>
            <div className="flex items-center justify-center mt-2 ">
              <div onClick={handleClick} className='bg-gray-500 w-2/6 flex pb-1 items-center justify-center  rounded-md hover:bg-gray-600 text-white '>
              <button  className='mt-2 font-semibold py-2 px-4'>
                Purchase Now
              </button>
            </div>            
            </div>
            
          </div>
        </div>
      );

      // Render the purchase overlay JSX component and append it to the video player container
      const videoContainer = document.querySelector(".video-js");
      if (videoContainer) {
        ReactDOM.render(purchaseOverlay, videoContainer);
      }

      // Hide the video controls for the purchase poster
      player.controls(false);
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
  }, [videoKey, isCoursePurchased]);

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
