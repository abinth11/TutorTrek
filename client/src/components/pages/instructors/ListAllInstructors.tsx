import React, { useEffect, useState } from "react";
import InstructorCard from "./InstructorCard";
import SelectCategory from "../students/CustomSelectBox";
import { Link } from "react-router-dom";
import { getAllInstructors } from "../../../api/endpoints/instructorManagement";
import { InstructorApiResponse } from "../../../api/types/apiResponses/apiResponseInstructors";
import { toast } from "react-toastify";
import ShimmerListAllInstructors from "../../Shimmers/ShimmerListAllInstructors";

type Props = {};

const ListAllInstructors: React.FC = (props: Props) => {
  const [instructors, setInstructors] = useState<
    InstructorApiResponse[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchInstructors = async () => {
    try {
      setIsLoading(true);
      const response = await getAllInstructors();
      setInstructors(response?.data?.data);
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
    fetchInstructors();
  }, []);
  console.log(instructors);
  if (isLoading) {
    return <ShimmerListAllInstructors />;
  }

  return (
    <div className=' h-full  pb-7'>
      <div className=' h-1/3 p-12 flex flex-col w-full bg-skyBlueCustom items-center justify-center'>
        <div className='block text-center'>
          <h1 className='p-2 text-customFontColorBlack md:text-4xl sm:text-4xl font-bold'>
            Our Instructors
          </h1>
        </div>
        <div className='block text-center '>
          <p className=' text-customFontColorBlack md:text-xl sm:text-4xl font-semibold'>
            Meet Tutor Trek Subject Experts
          </p>
        </div>
      </div>
      <div>
        <div className=' flex  p-3 bg-white justify-center'>
          <div className='p-5'>
            <select
              name=''
              className='mr-5 p-2 border rounded-md border-gray-200 '
              id=''
            >
              <option value='' disabled selected>
                Filter by Expertise
              </option>
            </select>
            <input
              type='text'
              className='p-2 border rounded-md  border-gray-200 focus:outline-none focus:border-blue-500'
              placeholder='Search instructors... '
            />
          </div>
        </div>
        <div className='p-10 flex items-center gap-y-10 bg-gray-50 justify-evenly flex-wrap'>
          {instructors?.map((instructor) => (
            <Link  key={instructor._id} to={`/tutors/${instructor._id}`}>
            <InstructorCard {...instructor}  />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ListAllInstructors;
