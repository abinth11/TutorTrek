import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIndividualInstructors } from "../../../api/endpoints/instructor-management";
import { InstructorApiResponse } from "../../../api/types/apiResponses/api-response-instructors";
import { toast } from "react-toastify";
import { Avatar } from "@material-tailwind/react";
import ViewInstructorShimmer from "components/shimmer/view-instructor-shimmer";

type Props = {};

const ViewInstructor: React.FC = (props: Props) => {
  const [instructor, setInstructor] = useState<InstructorApiResponse | null>(
    null
  );
  const { tutorId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchInstructor = async () => {
    try {
      setIsLoading(true);
      const response = await getIndividualInstructors(tutorId ?? "null");
      setInstructor(response?.data?.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  useEffect(() => {
    // Store the current scroll position
    const scrollPosition = window.pageYOffset;

    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Return a cleanup function
    return () => {
      // Restore the scroll position when unmounting
      window.scrollTo(0, scrollPosition);
    };
  }, []);

  useEffect(() => {
    fetchInstructor();
  }, []);
  if (isLoading) {
    return <ViewInstructorShimmer />;
  }

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
        <div className='w-11/12 md:w-8/12 p-5 -mt-10 md:-mt-20 bg-white shadow-xl rounded-xl h border border-gray-300 flex flex-col md:flex-row'>
          <div className='w-full md:p-10 md:w-1/4 h-auto lg:p-5 lg:pt-10 md:h-full'>
            <div className='  flex flex-col items-center '>
              <div className=' text-center'>
                <Avatar
                  className='h-32 w-32 mx-auto sm:mt-5'
                  src={
                    instructor?.profileUrl ??
                    "https://img.freepik.com/free-icon/user_318-159711.jpg"
                  }
                  alt='avatar'
                  size='xxl'
                />
                <h3 className='text-lg md:text-xl mt-2 md:mt-0'>
                  {instructor?.firstName + " " + instructor?.lastName}
                </h3>
              </div>
            </div>
          </div>
          <div className='w-full md:w-3/4 p-4 md:pt-14 text-customFontColorBlack  md:pr-14 pb-14'>
            <h2 className='text-xl font-semibold   mb-4'>About Me</h2>
            <p className='text-base'>{instructor?.about}</p>

            <div className='mt-8'>
              <h2 className='text-xl font-semibold mb-2'>Skills</h2>
              <p className='text-base'>{instructor?.skills}</p>
            </div>

            <div className='mt-8'>
              <h2 className='text-xl font-semibold mb-2'>Qualification</h2>
              <p className='text-base'>{instructor?.qualification}</p>
            </div>

            <div className='mt-8'>
              <h2 className='text-xl font-semibold mb-2'>Experience</h2>
              <p className='text-base'>{instructor?.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewInstructor;
