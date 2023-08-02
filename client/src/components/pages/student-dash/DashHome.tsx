import React from "react";
import { Tooltip, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectStudent } from "../../../redux/reducers/studentSlice";

type Props = {};

const DashHome: React.FC = (props: Props) => {
  const student = useSelector(selectStudent);
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-11/12'>
        <div>
          <div className='pt-5 pb-2 w-full'>
            <h2 className='text-3xl font-semibold text-customFontColorBlack'>
              Welcome back,{" "}
              {student.studentDetails?.firstName +
                " " +
                student.studentDetails?.lastName}
            </h2>
          </div>
          <div className='mb-2 pt-3'>
            <h5 className='text-customFontColorBlack font-semibold'>
              MY ASSIGNMENTS
            </h5>
          </div>
        </div>
        <div className='h-[30rem] flex flex-col md:flex-row gap-x-10'>
          <div className='border md:w-8/12 w-full h-full bg-white rounded-md border-gray-300'>
            <div className='flex h-full flex-col justify-center items-center'>
              <h2 className='text-xl font-semibold p-1 text-customFontColorBlack'>
                There’s nothing harder than starting from a blank canvas.
              </h2>
              <div className='w-7/12'>
                <p className='text-sm whitespace-pre-line text'>
                  Set a goal and we'll be your accountability partner with
                </p>
                <p className='text-sm ml-4 whitespace-pre-line text'>
                  custom reminders and weekly progress reports.
                </p>
              </div>
              <button className='bg-blue-500 mt-5 hover:bg-blue-600 rounded-md text-white p-2'>
                Set yourself a goal
              </button>
            </div>
          </div>
          <div className='border my-5 md:mt-0 md:w-4/12 w-full h-full bg-white rounded-md border-gray-300'>
            <div className='p-2 flex'>
              <h2 className='text-customFontColorBlack font-bold pt-2 pl-2'>
                My weekly goal
              </h2>
              <Tooltip
                content={
                  <div className='w-80'>
                    <Typography color='white' className='font-medium'>
                      Info
                    </Typography>
                    <Typography
                      variant='small'
                      color='white'
                      className='font-normal opacity-80'
                    >
                      To achieve your goal for a day, complete any lectures
                    </Typography>
                  </div>
                }
              >
                <InformationCircleIcon
                  strokeWidth={2}
                  className='text-blue-gray-500 w-4 h-4 mt-3 ml-0.5 cursor-pointer'
                />
              </Tooltip>
            </div>
            <div></div>
            <div className='m-4 bg-gray-200 rounded-md'>
              <h2 className='text-sm font-light p-2'>
                Make it a habit! Each day that you complete a lecture, practice
                with a lab, or take a quiz or exam you'll build your learning
                streak.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
