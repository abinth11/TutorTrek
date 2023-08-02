import React from "react";

const ShimmerEffectWatchLessons: React.FC = () => {
  return (
    <div className="flex h-screen pb-16">
      <div className="md:w-3/4 w-full overflow-y-scroll scrollbar-track-blue-gray-50 scrollbar-thumb-gray-400 scrollbar-thin scrollbar-h-md">
        <div className="h-3/4 bg-gray-200 rounded-lg p-4"></div>
        <div className="bg-gray-200 p-3">
          <ul className="flex p-3">
            <li className="ml-5 cursor-pointer w-20 h-4 bg-gray-300 rounded-md"></li>
            <li className="ml-6 cursor-pointer w-20 h-4 bg-gray-300 rounded-md"></li>
            <li className="ml-6 cursor-pointer w-20 h-4 bg-gray-300 rounded-md"></li>
          </ul>
        </div>
        <div className="p-5 ">
          <h2 className="w-1/4 h-4 mb-3 bg-gray-300 rounded-md"></h2>
          <h3 className="w-full h-20 bg-gray-300 rounded"></h3>
        </div>
      </div>
      <div className="w-1/4 hidden md:block flex-grow overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-rounded scrollbar-track-gray-200 scrollbar-thin">
        <h1 className="font-semibold text-blue-gray-800 text-2xl border-b border-gray-300 p-2 bg-gray-200 rounded"></h1>
        <ul>
          <li className="p-6 border-b flex items-center cursor-pointer hover:bg-blue-gray-50">
            <span className="flex-1 w-2/3 h-4 bg-gray-300 rounded"></span>
          </li>
          <li className="p-6 border-b flex items-center cursor-pointer hover:bg-blue-gray-50">
            <span className="flex-1 w-2/3 h-4 bg-gray-300 rounded"></span>
          </li>
          <li className="p-6 border-b flex items-center cursor-pointer hover:bg-blue-gray-50">
            <span className="flex-1 w-2/3 h-4 bg-gray-300 rounded"></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShimmerEffectWatchLessons;
