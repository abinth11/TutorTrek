import React from 'react';

const WatchLessonsShimmer: React.FC = () => {
  return (
    <div className='flex h-screen pb-16'>
      <div className='w-3/4 overflow-y-scroll scrollbar-track-blue-gray-50 scrollbar-thumb-gray-400 scrollbar-thin scrollbar-h-md'>
        <div className='h-3/4'>
          {/* Add shimmer effect to the video player */}
          <div className='h-16 w-full animate-pulse bg-blue-gray-200'></div>
        </div>
        <div className=''>
          <ul className='flex p-3'>
            {/* Add shimmer effect to each list item */}
            <li className='ml-5 cursor-pointer border-b-4 rounded-b-md border-blue-gray-700 animate-pulse'>
              About
            </li>
            <li className='ml-6 cursor-pointer border-b-4 rounded-b-md border-blue-gray-700 animate-pulse'>
              Discussion
            </li>
            <li className='ml-6 cursor-pointer border-b-4 rounded-b-md border-blue-gray-700 animate-pulse'>
              Quizzes
            </li>
          </ul>
        </div>
        <div className=' p-5'>
          {/* Add shimmer effect to the content */}
          <div className='h-4 w-full animate-pulse bg-blue-gray-200 mb-4'></div>
          <div className='h-4 w-full animate-pulse bg-blue-gray-200'></div>
        </div>
      </div>
      <div className='w-1/4 flex-grow overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-rounded scrollbar-track-gray-200 scrollbar-thin'>
        <h1 className='font-semibold text-blue-gray-800 text-2xl border-b border-gray-300 p-2'>
          Lessons
        </h1>
        <ul>
          {/* Add shimmer effect to each list item */}
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b border-gray-300 text-blue-gray-700 animate-pulse'>
            Lesson 1
          </li>
          <li className='p-3 pt-6 pb-6 cursor-pointer hover:bg-blue-gray-50 border-b border-gray-300 text-blue-gray-700 animate-pulse'>
            Lesson 2
          </li>
          {/* Add more shimmering list items */}
        </ul>
      </div>
    </div>
  );
};

export default WatchLessonsShimmer;
