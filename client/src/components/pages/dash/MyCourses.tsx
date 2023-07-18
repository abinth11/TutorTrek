import React from "react";
import MyCourseCard from "./MyCourseCard";

type Props = {};

const MyCourses: React.FC = (props: Props) => {
  return (
    <div className='w-full flex justify-center items-center '>
      <div className='w-11/12'>
        <div>
          <div className='pt-5 pb-2 w-full'>
            <h2 className='text-3xl font-semibold text-customFontColorBlack'>
              Watch Courses
            </h2>
          </div>
          <div className='mb-2 pt-3'>
            <h5 className='text-customFontColorBlack font-semibold'>
              MY COURSES
            </h5>
          </div>
        </div>
        <div className='flex gap-x-10 h-full pb-10'>
          <div className=' w-full h-full   bg-white rounded-md '>
            <div className='flex pt-10 pb-10 flex-wrap border border-gray-300 rounded-md items-center bg-white  justify-center gap-x-10 gap-y-5'>
              <MyCourseCard />
              <MyCourseCard />
              <MyCourseCard />
              <MyCourseCard />
              <MyCourseCard />
              <MyCourseCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
