import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import AboutLesson from "./AboutLesson";
import Quizzes from "./Quizzes";
import Discussion from "./Discussion";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getLessonById } from "../../../api/endpoints/course/lesson";
import { getLessonsByCourse } from "../../../api/endpoints/course/lesson";
import { ApiResponseLesson } from "../../../api/types/apiResponses/apResponseLesson";
import { Media } from "../../../api/types/apiResponses/apResponseLesson";
import { BiVideo } from "react-icons/bi";
import ShimmerEffectWatchLessons from "../../Shimmers/WatchLessonsShimmer";
import ShimmerVideoPlayer from "../../Shimmers/ShimmerVideoPlayer";

const WatchLessons: React.FC = () => {
  const videoSrc =
    "https://res.cloudinary.com/dwucedjmy/video/upload/v1687586931/Tutor-Trek/ons1wwwaa1f2ygz8r67e.mp4";

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [isLoadingAllLessons, setIsLoadingAllLessons] = useState(false);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);
  const [lesson, setLesson] = useState<ApiResponseLesson | null>(null);
  const [allLessons, setAllLessons] = useState<Array<ApiResponseLesson>>([]);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const { lessonId } = useParams();
  const [currentLessonId, setCurrentLessonId] = useState<string | undefined>(
    lessonId
  );
  const { courseId } = useParams();

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const fetchLessonsByCourse = async (courseId: string) => {
    try {
      setIsLoadingAllLessons(true);
      const response = await getLessonsByCourse(courseId);
      setAllLessons(response.data);
      setTimeout(() => {
        setIsLoadingAllLessons(false);
      }, 3000);
    } catch (error: any) {
      setIsLoadingAllLessons(false);
      toast.error(error.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const fetchLesson = async (lessonId: string) => {
    try {
      setIsLoadingLesson(true);
      const response = await getLessonById(lessonId);
      setLesson(response.data);
      const key = response.data.media.find(
        (media: Media) => media.name === "lessonVideo"
      )?.key;
      setVideoKey(key);
      setTimeout(() => {
        setIsLoadingLesson(false);
      }, 2000);
    } catch (error: any) {
      setIsLoadingLesson(false);
      toast.error(error.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    currentLessonId && fetchLesson(currentLessonId);
  }, [currentLessonId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Hide the browser's scroll bar on component mount
    document.body.style.overflow = "hidden";
    courseId && fetchLessonsByCourse(courseId);
    // fetchVideoUrl()
    return () => {
      // Restore the browser's scroll bar on component unmount
      document.body.style.overflow = "auto";
    };
  }, []);

  let content = null;

  if (selectedItemIndex === 0) {
    content = <AboutLesson about={lesson?.description ??''} />;
  } else if (selectedItemIndex === 1) {
    content = <Discussion lessonId={currentLessonId??''}/>;
  } else {
    content = <Quizzes lessonId={lessonId} />;
  }
  if (isLoadingAllLessons && isLoadingLesson) {
    return <ShimmerEffectWatchLessons />;
  }
  return (
    <div className='flex h-screen pb-16'>
      {isLoadingLesson ? (
        <ShimmerVideoPlayer />
      ) : (
        <div className='w-3/4  overflow-y-scroll scrollbar-track-blue-gray-50 scrollbar-thumb-gray-400 scrollbar-thin scrollbar-h-md'>
          <div className='h-3/4'>
            <VideoPlayer videoKey={videoKey} />
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
          <div className='pl-8 pr-8 pb-12 pt-4'>
            {content}
          </div>
        </div>
      )}
      <div className='w-1/4 flex-grow mt-3 mb-2 overflow-y-scroll  scrollbar-thumb-gray-400  scrollbar-rounded scrollbar-track-gray-200 scrollbar-thin'>
        <h1 className='font-semibold text-blue-gray-800 text-2xl border-b border-gray-300 p-2'>
          Lessons
        </h1>
        <ul>
          {allLessons.map((lesson) => (
            <li
              key={lesson._id}
              onClick={() => {
                setCurrentLessonId(lesson._id);
              }}
              className={`p-6 border-b-2 flex items-center cursor-pointer 
              ${lesson._id === currentLessonId ? "bg-gray-200 hover:bg-gray-200" : "hover:bg-gray-100"}
              `}
            >
              <BiVideo className='mr-2 text-blue-500' />
              <span className='flex-1'>{lesson.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WatchLessons;
