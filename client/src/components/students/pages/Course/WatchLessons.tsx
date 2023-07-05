import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import AboutLesson from "./AboutLesson";
import Quizzes from "./Quizzes";
import Discussion from "./Discussion";
import { getLessonById } from "../../../../api/endpoints/course/course";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const WatchLessons: React.FC = () => {
  const videoSrc =
    "https://res.cloudinary.com/dwucedjmy/video/upload/v1687586931/Tutor-Trek/ons1wwwaa1f2ygz8r67e.mp4";

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [isLoading,setIsLoading] = useState(false)
  const {lessonId} = useParams()

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const fetchLesson = async (lessonId:string)=>{
    try {
      const response = await getLessonById(lessonId)
      console.log(response)
    } catch(error:any){
      toast.error(error.data.message,{position:toast.POSITION.BOTTOM_RIGHT})
    }
  }
    useEffect(() => {
      window.scrollTo(0, 0);
      // Hide the browser's scroll bar on component mount
      document.body.style.overflow = "hidden";
      if(lessonId){
        fetchLesson(lessonId)
      }
      return () => {
        // Restore the browser's scroll bar on component unmount
        document.body.style.overflow = "auto";
      };
    }, []);

  let content = null;

  if (selectedItemIndex === 0) {
    content = <AboutLesson />;
  } else if (selectedItemIndex === 1) {
    content = <Discussion />;
  } else {
    content = <Quizzes />;
  }
  return (
    <div className='flex h-screen pb-16'>
      <div className='w-3/4 overflow-y-scroll scrollbar-track-blue-gray-50 scrollbar-thumb-gray-400 scrollbar-thin scrollbar-h-md'>
        <div className='h-3/4'>
          <VideoPlayer src={videoSrc} />
        </div>
        <div className=''>
          <ul className='flex p-3'>
            <li
              className={`ml-5 cursor-pointer ${
                selectedItemIndex === 0
                  ? "border-b-4 rounded-b-md border-blue-gray-700"
                  : ""
              }`}
              onClick={() => handleItemClick(0)}
            >
              About
            </li>
            <li
              className={`ml-6 cursor-pointer ${
                selectedItemIndex === 1
                  ? "border-b-4 rounded-b-md  border-blue-gray-700"
                  : ""
              }`}
              onClick={() => handleItemClick(1)}
            >
              Discussion
            </li>
            <li
              className={`ml-6 cursor-pointer ${
                selectedItemIndex === 2
                  ? "border-b-4 rounded-b-md  border-blue-gray-700"
                  : ""
              }`}
              onClick={() => handleItemClick(2)}
            >
              Quizzes
            </li>
          </ul>
        </div>
        <div className=' p-5'>
          <h2>{content}</h2>
          <h3>
            t is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English. Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text,
            and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions have evolved over the years,
            sometimes by accident, sometimes on purpose (injected humour and the
            like). t is a long established fact that a reader will be distracted
            by the readable content of a page when looking at its layout. The
            point of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like). t is a long established fact that a reader will be
            distracted by the readable content of a page when looking at its
            layout. The point of using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters, as opposed to using 'Content here,
            content here', making it look like readable English. Many desktop
            publishing packages and web page editors now use Lorem Ipsum as
            their default model text, and a search for 'lorem ipsum' will
            uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose
            (injected humour and the like).
          </h3>
        </div>
      </div>
      <div className='w-1/4 flex-grow overflow-y-scroll  scrollbar-thumb-gray-400  scrollbar-rounded scrollbar-track-gray-200 scrollbar-thin'>
        <h1 className='font-semibold text-blue-gray-800 text-2xl border-b border-gray-300 p-2'>
          Lessons
        </h1>
        <ul>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 1
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 2
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 3
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 4
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 5
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 1
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 2
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 3
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 4
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 5
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 3
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 4
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 5
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 3
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 4
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 5
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 3
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 4
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b  border-gray-300 text-blue-gray-700 '>
            lesson 5
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WatchLessons;
