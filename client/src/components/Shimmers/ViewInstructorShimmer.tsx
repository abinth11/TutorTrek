import React from 'react';

const ViewInstructorShimmer: React.FC = () => {
  return (
    <div className='h-full pb-7'>
      <div className='h-2/3 p-6 md:p-12 pb-10 md:pb-24 flex flex-col w-full bg-skyBlueCustom items-center justify-center'>
        <div className='block text-center'>
          <h1 className='p-2 text-customFontColorBlack text-3xl md:text-4xl font-bold'>
            Our Instructors
          </h1>
        </div>
        <div className='block text-center pb-5'>
          <p className='text-customFontColorBlack text-lg md:text-xl font-semibold'>
            Meet Tutor Trek Subject Experts
          </p>
        </div>
      </div>

      <div className='flex justify-center items-center '>
        <div className='w-11/12 md:w-8/12 -mt-10 md:-mt-20 p-5 bg-white shadow-xl rounded-xl h border border-gray-300 flex flex-col md:flex-row'>
          <div className='w-full  md:w-1/4 h-auto lg:p-5 lg:pt-10 md:h-full'>
            <div className='md:pl-5 md:pr-10 flex flex-col items-center md:items-start'>
              <div className=' text-center'>   
                <div className='animate-shimmer h-32 w-32 mx-auto bg-gray-300 rounded-full'></div>
                <div className='animate-shimmer mt-2 h-6 w-40 bg-gray-300 rounded-full'></div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-3/4 p-4 md:pt-14 md:pr-14 pb-14'>
            <div className='animate-shimmer mb-4 h-4 w-3/4 bg-gray-300 rounded-full'></div>
            <div className='animate-shimmer mb-4 h-4 w-1/2 bg-gray-300 rounded-full'></div>
            <div className='animate-shimmer mb-4 h-4 w-2/3 bg-gray-300 rounded-full'></div>
            <div className='animate-shimmer mb-4 h-4 w-3/4 bg-gray-300 rounded-full'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInstructorShimmer;
