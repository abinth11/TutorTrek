import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { getAllCourses } from "../../../api/endpoints/course/courseStudents";
import { toast } from "react-toastify";
import { CourseInterface } from "../../../types/course";
import { Link } from "react-router-dom";
import ShimmerCard from "../../Shimmers/ShimmerCard";

const ListCourse: React.FC = () => {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      const courses = await getAllCourses();
      setCourses(courses?.data?.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error: any) {
      toast.error(error?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div>
      <div className='pl-12 pt-4 mt-5 ml-10 mb-2'>
        <h1 className='text-3xl font-bold'>A broad selection of courses</h1>
        <p className='text-gray-700'>
          Choose from over 4,000 online video courses with new additions
          published every month
        </p>
      </div>

      <div className='px-10 mt-3 ml-10'>
        <div className='flex flex-wrap'>
          <div className=' text-gray-900 rounded-lg px-4 py-2 mr-2 mb-2 cursor-pointer '>
            Python
          </div>
          <div className=' text-gray-900 rounded-lg px-4 py-2 mr-2 mb-2 cursor-pointer'>
            JavaScript
          </div>
          <div className=' text-gray-900 rounded-lg px-4 py-2 mr-2 mb-2 cursor-pointer'>
            Web dev
          </div>
          <div className=' text-gray-900 rounded-lg px-4 py-2 mr-2 mb-2 cursor-pointer'>
            Mobile dev
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className='px-10 pb-10 mt-5 ml-14 flex flex-wrap'>
          {[...Array(2)].map((_, index) => (
            <div className='mr-6' key={index}>
              <ShimmerCard />
            </div>
          ))}
        </div>
      ) : (
        <div className='px-10 pb-10 mt-3 ml-10 flex flex-wrap'>
          {courses.map((course: CourseInterface, index: number) => {
            return (
              <Link to={course._id} key={index}>
                <div className='m-3'>
                  <CourseCard course={course} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListCourse;
