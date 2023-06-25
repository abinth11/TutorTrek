import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { getAllCourses } from "../../../../api/endpoints/student/course";
import { toast } from "react-toastify";
import { CourseInterface } from "../../../../types/course";
import { Link } from "react-router-dom";

const ListCourse: React.FC = () => {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const fetchCourse = async () => {
    try {
      const courses = await getAllCourses();
      setCourses(courses.data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);
  return (
    <div>
      <div className='pl-12 mt-5 pt-2 ml-10 mb-2'>
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
      <div className='px-10 pb-10 mt-3 ml-10 flex flex-wrap'>
        {courses.map((course: CourseInterface, index: number) => {
          console.log(course);
          return (
            <Link to={course._id} key={index}>
              <div className='m-3'>
                <CourseCard course={course} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ListCourse;
