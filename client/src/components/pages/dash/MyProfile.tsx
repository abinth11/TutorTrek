import React from "react";
import { Avatar } from "@material-tailwind/react";
import ProfileForm from "./ProfileFrom";
import ChagePasswordForm from "./ChagePasswordForm";

type Props = {};

const MyProfile: React.FC = (props: Props) => {
  return (
    <div className='w-full flex justify-center items-center '>
      <div className='w-11/12'>
        <div>
          <div className='pt-5 pb-6 w-full'>
            <h2 className='text-3xl font-semibold text-customFontColorBlack'>
              Edit profile info
            </h2>
          </div>
        </div>
        <div className='flex gap-x-10 h-full pb-10'>
          <div className='border   w-7/12 h-full rounded-md  bg-white border-gray-300'>
            <h3 className='pl-5 pt-5 text-lg text-customFontColorBlack font-semibold'>
              Account Info
            </h3>
            <div className='p-5 flex '>
              <Avatar
                src='data:image/jpeg;base64,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'
                alt='avatar'
                size='xl'
              />
              <div className='pl-4'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  htmlFor='file_input'
                >
                  Upload file
                </label>
                <input
                  className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                  id='file_input'
                  type='file'
                />
              </div>
            </div>
            <div className='p-6'>
              <ProfileForm />
            </div>
          </div>
          <div className='border  pt-5 pb-10  w-5/12 h-full rounded-md  bg-white border-gray-300'>
            <h3 className='pl-5  text-lg text-customFontColorBlack font-semibold'>
              Change password
            </h3>
            <div className="p-6">
            <ChagePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
