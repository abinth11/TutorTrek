import React, { useEffect, useState } from "react";
import CustomBreadCrumbs from "../../../common/BreadCrumbs";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { getIndividualCourse } from "../../../../api/endpoints/course/courseStudents";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CourseInterface } from "../../../../types/course";
import { formatToINR } from "../../../../utils/helpers";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { BiVideo } from "react-icons/bi";
import { IoBookSharp } from "react-icons/io5";
import useApiData from "../../../../hooks/useApiCall";
import ViewCourseShimmer from "../../../Shimmers/ViewCourseShimmer";
const ViewCourseStudent: React.FC = () => {
  const params = useParams();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const courseId: string | undefined = params.courseId;

  const fetchCourse = async (courseId: string): Promise<CourseInterface> => {
    try {
      const course = await getIndividualCourse(courseId);
      return course?.data?.data as CourseInterface;
    } catch (error: any) {
      toast.error(error.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      throw error;
    }
  };

  // const fetchLessons = await

  const [data,isLoading] = useApiData(fetchCourse, courseId);
  // const [lessoninfo,isLoadingLesson] = useApiData()
  const course: CourseInterface | null = data;

  const handleToggle = (index: any) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  const location = useLocation();
  if (isLoading) {
    return <ViewCourseShimmer />;
  }

  return (
    <div className='bg-white'>
      <div className='flex flex-col pr-5 pt-5 pl-80  '>
        <CustomBreadCrumbs paths={location.pathname} />
      </div>
      <div className='flex flex-col items-center '>
        <div className='max-w-4xl overflow-hidden'>
          <div className='relative p-4 '>
            <img
              className='w-full h-64 object-cover'
              src={course?.thumbnail}
              alt='Course Title'
            />
            <div className='absolute top-3 right-3 shadow-md bg-blue-500 text-white px-4 py-2 text-sm rounded-tl-lg rounded-br-lg'>
              Bestseller
            </div>
          </div>
          <div className='p-6'>
            <h2 className='text-3xl font-bold mb-4'>{course?.title}</h2>
            <p className='text-gray-700 text-lg mb-6'>{course?.description}</p>
            <div className='flex items-center mb-4'>
              <div className='bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2'>
                Intermediate
              </div>
              <div className='bg-gray-300 text-gray-700 rounded-full px-3 py-1 text-sm'>
                Technology
              </div>
            </div>
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h4 className='text-xl font-semibold'>Instructor</h4>
                <p className='text-gray-700'>John Doe</p>
              </div>
              <div>
                <h4 className='text-xl font-semibold'>Duration</h4>
                <p className='text-gray-700'>{course?.duration} weeks</p>
              </div>
              <div>
                <h4 className='text-xl font-semibold'>Price</h4>
                <p className='text-gray-700'>
                  {formatToINR(course?.price ?? 0)}
                </p>
              </div>
            </div>

            <div className='mb-8'>
              <h4 className='text-2xl font-semibold mb-2'>Syllabus</h4>
              <ul className='text-gray-700 bg-white mt-2 rounded-lg shadow-lg border-2'>
                <li
                  className={` p-6 border-b-2 cursor-pointer ${
                    expandedIndex === 0
                      ? "bg-blue-gray-50"
                      : "hover:bg-blue-gray-50"
                  }`}
                  onClick={() => handleToggle(0)}
                >
                  <div className='flex items-center'>
                    <span className='text-blue-500 mr-2'>&#9679;</span>
                    <span>Module 1: Introduction to the Course</span>
                    {expandedIndex === 0 ? (
                      <FaAngleUp className='ml-auto' />
                    ) : (
                      <FaAngleDown className='ml-auto' />
                    )}
                  </div>
                </li>
                {expandedIndex === 0 && (
                  <li className=''>
                    <ul>
                      <li className='p-6 border-b flex items-center cursor-pointer hover:bg-blue-gray-50'>
                        <IoBookSharp className='mr-2 text-blue-500' />
                        <span className='flex-1'>Important guidelines</span>
                      </li>
                      <Link to={"watch-lessons/1"}>
                        <li className='p-6 border-b flex items-center cursor-pointer hover:bg-blue-gray-50'>
                          <BiVideo className='mr-2 text-blue-500' />
                          <span className='flex-1'>Introduction video</span>
                        </li>
                      </Link>
                    </ul>
                  </li>
                )}
                <li
                  className={` p-6  cursor-pointer ${
                    expandedIndex === 1
                      ? "bg-blue-gray-50"
                      : "hover:bg-blue-gray-50"
                  } parent-li`}
                  onClick={() => handleToggle(1)}
                >
                  <div className='flex items-center'>
                    <span className='text-blue-500 mr-2'>&#9679;</span>
                    <span>Module 2: Advanced Techniques</span>
                    {expandedIndex === 1 ? (
                      <FaAngleUp className='ml-auto' />
                    ) : (
                      <FaAngleDown className='ml-auto' />
                    )}
                  </div>
                </li>
                {expandedIndex === 1 && (
                  <li className='p-6 child-li'>
                    <ul>
                      <li className='w-full'>
                        <p>It contains various topics and subtopics.</p>
                      </li>
                      <li className='w-full'>
                        <p>It contains various topics and subtopics.</p>
                      </li>
                      <li className='w-full'>
                        <p>It contains various topics and subtopics.</p>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>

            <div className='mb-8'>
              <h4 className='text-2xl font-semibold mb-2'>About this course</h4>
              <p className='text-gray-700 mb-2 bg-white p-6 rounded-lg shadow-lg border-2'>
                This course requires basic knowledge of JavaScript, familiarity
                with HTML and CSS, and access to a computer with an internet
                connection.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>

            <div className='mb-8'>
              <h4 className='text-2xl font-semibold mb-2'>Requirements</h4>
              <ul className='text-gray-700 bg-white mt-2 border-2 shadow-md  rounded-lg'>
                <li className='mb-2 p-3 pt-3'>
                  <span className='text-blue-500 mr-2 '>&#9679;</span> Basic
                  knowledge of JavaScript
                </li>
                <li className='mb-2 p-3'>
                  <span className='text-blue-500 mr-2'>&#9679;</span>
                  Familiarity with HTML and CSS
                </li>
                <li className='mb-4 p-3'>
                  <span className='text-blue-500 mr-2'>&#9679;</span> Access to
                  a computer with internet connection
                </li>
              </ul>
            </div>
            <div className='flex items-center justify-end'>
              <Button className='rounded-full mr-2'>Enroll now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewCourseStudent;
