import React from "react";

const YouAreOffline: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h4 className="text-2xl font-bold mb-4">You are offline.</h4>
        <p className="text-gray-600">Please check your internet connection...</p>
        <div className="mt-4">
          <svg
            className="animate-spin h-8 w-8 text-gray-600 mx-auto"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default YouAreOffline;
