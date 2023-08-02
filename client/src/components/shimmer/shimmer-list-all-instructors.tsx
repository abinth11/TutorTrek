import React from "react";
import ViewInstructorsCardShimmer from "./view-instructors-card-shimmer";

const Shimmer = () => {
  return (
    <div className='h-full pb-7'>
      <div className='h-1/3 p-12 flex flex-col w-full bg-skyBlueCustom items-center justify-center animate-pulse'>
        <div className='block text-center'>
          <h1 className='p-2 text-customFontColorBlack md:text-4xl sm:text-4xl font-bold bg-gray-300 rounded w-60 h-8 mb-4'></h1>
        </div>
        <div className='block text-center'>
          <p className='text-customFontColorBlack md:text-xl sm:text-4xl font-semibold bg-gray-300 rounded w-64 h-4'></p>
        </div>
      </div>
      <div>
        <div className='flex p-3 bg-white justify-center'>
          <div className='p-5 flex'>
            <div className='w-52 mr-5 h-10 bg-gray-300 rounded animate-pulse mb-5'></div>
            <div className='w-52 h-10 bg-gray-300 rounded animate-pulse'></div>
          </div>
        </div>
        <div className='p-10 flex items-center gap-y-10 bg-gray-50 justify-evenly flex-wrap'>
          {Array.from({ length: 6 }).map((_, index) => (
            <ViewInstructorsCardShimmer key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
