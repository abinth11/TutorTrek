import React, { useState, useEffect } from "react";
import MyCourseCard from "./my-course-card";
import { getCourseByStudent } from "../../../api/endpoints/course/course";
import { toast } from "react-toastify";
import { CourseInterface } from "../../../types/course";
import { Link } from "react-router-dom";
import ProfileCardShimmer from "../../shimmer/profile-card-shimmer";
type Props = {};

const MyCourses: React.FC = (props: Props) => {
  const [courses, setCourse] = useState<CourseInterface[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getCourseByStudent();
      setCourse(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      setLoading(false);
      toast.success(error?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className='w-full flex justify-center items-center  '>
      <div className='w-11/12 '>
        <div>
          <div className='pt-5 pb-2 w-full'>
            <h2 className='text-3xl font-semibold text-customFontColorBlack'>
              Watch Courses
            </h2>
          </div>
          <div className='mb-2 pt-3'>
            <h5 className='text-customFontColorBlack font-semibold'>
              MY COURSES
            </h5>
          </div>
        </div>
        <div className='flex gap-x-10 h-full pb-10'>
          <div className=' w-full h-full   bg-white rounded-md '>
            <div className='flex pt-10  pb-10 flex-wrap border border-gray-300 rounded-md items-center bg-white  justify-center gap-x-10 gap-y-5 '>
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => {
                  return <ProfileCardShimmer key={index} />;
                })
              ) : courses?.length ? (
                courses.map((course) => (
                  <Link to={`/courses/${course._id}`} key={course._id}>
                    <MyCourseCard {...course} />
                  </Link>
                ))
              ) : (
                <div className='text-center'>
                  Please enroll into a course.{" "}
                  <Link to='/courses' className='text-blue-500 underline'>
                    View available courses
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
