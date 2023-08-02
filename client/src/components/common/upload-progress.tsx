import React from "react";

const VideoUploader: React.FC<{ uploadProgress: number }> = ({
  uploadProgress,
}) => {
  return (
    <div className='container mx-auto'>
      <h2 className='text-lg font-bold mb-2'>Video Uploader</h2>

      {uploadProgress > 0 && (
        <div className='mt-4'>
          <h3 className='text-lg font-bold mb-2'>Upload Progress</h3>
          <div className='bg-gray-200 rounded'>
            <div
              className='bg-blue-500 text-xs leading-none py-1 text-center text-white rounded'
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
          <p className='text-xs mt-1'>{`Uploaded: ${uploadProgress}%`}</p>
        </div>
      )}

      {/* You can add additional indicators like upload speed or time estimation here */}
    </div>
  );
};

export default VideoUploader;
