import React from "react";
import Carousel from "../../elements/Carousel";
import CourseCardHome from "../home/CourseCard";

const StudentHomePage: React.FC = () => {
  return (
    <div className=''>
      <Carousel />
      <div className='p-10 w-full '>
        <div className=' -ml-5 flex items-center justify-center w-3/12'>
          <h2 className=' p-2 text-customFontColorBlack text-2xl font-bold'>
            Trending Courses
          </h2>
        </div>
        <div className='flex items-center justify-center flex-wrap '>
          <CourseCardHome />
          <CourseCardHome />
          <CourseCardHome />
        </div>
      </div>
      <div className='p-10 w-full '>
        <div className='ml-2 flex items-center justify-center w-3/12'>
          <h2 className=' p-2 text-customFontColorBlack text-2xl font-bold'>
            Recommended courses
          </h2>
        </div>
        <div className='flex items-center justify-center flex-wrap '>
          <CourseCardHome />
          <CourseCardHome />
          <CourseCardHome />
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
