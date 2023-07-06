import React from "react";
const ShimmerVideoPlayer: React.FC = () => {
  return (
    <div className='w-3/4 overflow-y-scroll scrollbar-track-blue-gray-50 scrollbar-thumb-gray-400 scrollbar-thin scrollbar-h-md'>
      <div className='h-3/4 bg-gray-200 rounded-lg p-4'></div>
      <div className='bg-gray-200 p-3'>
        <ul className='flex p-3'>
          <li className='ml-5 cursor-pointer w-20 h-4 bg-gray-300 rounded-md'></li>
          <li className='ml-6 cursor-pointer w-20 h-4 bg-gray-300 rounded-md'></li>
          <li className='ml-6 cursor-pointer w-20 h-4 bg-gray-300 rounded-md'></li>
        </ul>
      </div>
      <div className='p-5 '>
        <h2 className='w-1/4 h-4 mb-3 bg-gray-300 rounded-md'></h2>
        <h3 className='w-full h-20 bg-gray-300 rounded'></h3>
      </div>
    </div>
  );
};
export default ShimmerVideoPlayer