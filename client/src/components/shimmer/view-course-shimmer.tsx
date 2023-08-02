import React from 'react';

const ViewCourseShimmer: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col pr-10 w-5/12  pt-5 pl-80">
        <div className="h-8 bg-gray-200 animate-pulse" />
      </div>
      <div className="flex flex-col items-center ">
        <div className="max-w-4xl overflow-hidden w-8/12">
          <div className="relative p-4">
            <div className="w-full h-64 bg-gray-200 animate-pulse" />
            <div className="absolute top-3 right-3 shadow-md bg-gray-200 text-gray-200 px-4 py-2 text-sm rounded-tl-lg rounded-br-lg animate-pulse" />
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4 bg-gray-200 h-8 animate-pulse" />
              <p className="text-gray-700 text-lg mb-6 bg-gray-200 h-6 animate-pulse" />
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 text-gray-200 rounded-full px-3 py-1 text-sm mr-2 animate-pulse" />
                <div className="bg-gray-200 text-gray-200 rounded-full px-3 py-1 text-sm animate-pulse" />
              </div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-xl font-semibold bg-gray-200 h-6 animate-pulse" />
                  <p className="text-gray-700 bg-gray-200 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold bg-gray-200 h-6 animate-pulse" />
                  <p className="text-gray-700 bg-gray-200 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold bg-gray-200 h-6 animate-pulse" />
                  <p className="text-gray-700 bg-gray-200 h-4 animate-pulse" />
                </div>
              </div>
              <div className="mb-8">
                <h4 className="text-2xl font-semibold mb-2 bg-gray-200 h-8 animate-pulse" />
                <ul className="text-gray-700 bg-gray-200 mt-2 rounded-lg shadow-lg border-2">
                  <li className="p-6 border-b-2 cursor-pointer bg-gray-200 h-8 animate-pulse" />
                </ul>
              </div>
              <div className="mb-8">
                <h4 className="text-2xl font-semibold mb-2 bg-gray-200 h-8 animate-pulse" />
                <p className="text-gray-700 mb-2 bg-gray-200 p-6 rounded-lg shadow-lg border-2 h-20 animate-pulse" />
              </div>
              <div className="mb-8">
                <h4 className="text-2xl font-semibold mb-2 bg-gray-200 h-8 animate-pulse" />
                <ul className="text-gray-700 bg-gray-200 mt-2 border-2 shadow-md rounded-lg">
                  <li className="mb-2 p-3 pt-3 bg-gray-200 h-4 animate-pulse" />
                  <li className="mb-2 p-3 bg-gray-200 h-4 animate-pulse" />
                  <li className="mb-4 p-3 bg-gray-200 h-4 animate-pulse" />
                </ul>
              </div>
              <div className="flex items-center justify-end">
                <button className="rounded-full mr-2 bg-gray-200 h-10 w-24 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourseShimmer;
