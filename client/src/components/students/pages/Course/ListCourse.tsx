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
      setCourses(courses.data.data)
    } catch (error: any) {
        console.log(error)
        toast.error(error.data.message,{position:toast.POSITION.BOTTOM_RIGHT})
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);
  return (
    <div className='p-10 m-5 ml-10 flex flex-wrap '>
        {
            courses.map((course:CourseInterface, index:number) => {
                console.log(course)
                return (
                    <Link to={course._id}>
                    <div key={index} className='m-4'>
                        <CourseCard course={course} />
                    </div>
                    </Link>
                );
            })
        }
    </div>
  );
};

export default ListCourse;
