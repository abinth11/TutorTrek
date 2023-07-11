import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const ShimmerCard = () => {
  return (
    <div className='w-[18.5rem] p-5 overflow-hidden hover:shadow-md hover:border animate-pulse'>
      <div className='relative'>
        <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-[12rem] w-full rounded'></div>
      </div>
      <div className='pt-4'>
        <div className='mb-3'>
          <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-6 w-1/2 mb-2 rounded'></div>
        </div>
        <div className='space-y-2'>
          <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-4 w-3/4 rounded'></div>
          <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-4 w-5/6 rounded'></div>
          <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-4 w-1/2 rounded'></div>
        </div>
        <div className='mt-4 flex justify-between items-center'>
          <div className='group'>
            <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-4 w-1/4 rounded'></div>
          </div>
          <div className='flex items-center gap-1.5'>
            <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-4 w-6 rounded'></div>
            <div className='bg-gradient-to-r from-gray-300 to-gray-100 h-4 w-8 rounded'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
