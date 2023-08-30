import React, { useEffect, useState } from "react";
import CourseCard from "./course-card";
import {
  getAllCourses,
  searchCourse,
} from "../../../api/endpoints/course/course";
import { toast } from "react-toastify";
import { CourseInterface } from "../../../types/course";
import { Link } from "react-router-dom";
import ShimmerCard from "../../shimmer/shimmer-card";
import { RiSearchLine } from "react-icons/ri";
import FilterCoursesSelectBox from "./filter-course-selectbox";
import { debounce } from "lodash";
import { MdSentimentDissatisfied } from "react-icons/md";

const ListCourse: React.FC = () => {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState<string>("");

  const fetchCourse = async () => {
    try {
      const courses = await getAllCourses();
      setCourses(courses?.data?.data || []);
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

  useEffect(() => {
    console.log(searchQuery)
    const debouncedHandleCourseSearch = debounce(async () => {
      if (searchQuery.trim() !== "") {
        try {  
          const response = await searchCourse(searchQuery, "");
          setCourses(response?.data?.data || response?.data);
        } catch (error) {
          toast.error("Failed to search course");
        }
      } else if (filterQuery.trim() !== "") {
        try {
          const response = await searchCourse("", filterQuery);
          setCourses(response?.data?.data || response?.data);
        } catch (error) { 
          toast.error("Failed to search course");
        }
      } else {
        fetchCourse();
      }
    }, 300);

    debouncedHandleCourseSearch();

    return () => {
      debouncedHandleCourseSearch.cancel();
    };
  }, [searchQuery, filterQuery]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = (data: string) => {
    setFilterQuery(data);
  };

  if (isLoading) {
    return (
      <div className='text-customFontColorBlack  '>
        <div className='pt-5 pb-5 pl-9 pr-9 mt-5 mx-auto flex justify-center'>
          <div className='w-10/12 ml-2 pl-1 animate-pulse'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 h-8 rounded'></h1>
            <p className='text-gray-700 mt-2 bg-gradient-to-r from-gray-300 to-gray-100 h-4 rounded'></p>
          </div>
        </div>
        <div className='mx-auto pl-10 pr-10  flex justify-center'>
          <div className='w-10/12 pl-1 border-b-gray-100 border-b-2 mx-auto animate-pulse'>
            <div className='flex flex-wrap'>
              <div className='text-gray-900 rounded-lg px-2 py-2 mr-2 mb-2 cursor-pointer bg-gradient-to-r from-gray-300 to-gray-100 h-8 w-16'></div>
              <div className='text-gray-900 rounded-lg px-4 py-2 mr-2 mb-2 cursor-pointer bg-gradient-to-r from-gray-300 to-gray-100 h-8 w-24'></div>
              <div className='text-gray-900 rounded-lg px-4 py-2 mr-2 mb-2 cursor-pointer bg-gradient-to-r from-gray-300 to-gray-100 h-8 w-20'></div>
              <div className='text-gray-900 rounded-lg px-4 py-2 mr-2 mb-2 cursor-pointer bg-gradient-to-r from-gray-300 to-gray-100 h-8 w-24'></div>
            </div>
          </div>
        </div>

        <div className=' mx-auto flex justify-center'>
          <div className='w-10/12 '>
            <div className='flex mt-3 flex-wrap justify-center'>
              {[...Array(8)].map((_, index) => (
                <div className='m-2 py-3' key={index}>
                  <ShimmerCard />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='text-customFontColorBlack'>
      <div className='pt-5 pb-5 pl-9 pr-9 mt-5 mx-auto flex justify-center'>
        <div className='w-10/12 ml-2 pl-1'>
          <h1 className='text-2xl lg:text-3xl font-bold'>
            A broad selection of courses
          </h1>
          <p className='text-gray-700 md:text-lg sm:text-xs'>
            Choose from over {courses?.length} online video courses with new
            additions published every month
          </p>
        </div>
      </div>
      <div className='flex p-3 bg-gray-50 justify-center'>
        <div className='p-5 flex flex-col md:flex-row  md:w-8/12 lg:w-6/12 gap-x-5 w-full'>
          <FilterCoursesSelectBox handleSelect={handleSelect} />
          <div className='relative w-full mt-2 p-2  md:w-1/2'>
            <input
              type='text'
              value={searchQuery}
              onChange={handleSearchInputChange}
              className='p-1.5 pr-8 border rounded-md  border-gray-400 focus:outline-none focus:border-blue-500 h-10 w-full'
              placeholder='Search Courses...'
            />
            <div className='absolute top-7 right-4 transform -translate-y-1/2 text-gray-400 cursor-pointer'>
              <RiSearchLine size={24} />
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto flex justify-center'>
        <div className='w-10/12'>
          <div className='flex mt-3  flex-wrap justify-center'>
            {courses.length ? (
              courses?.map((course: CourseInterface, index: number) => (
                <Link to={course._id} key={course._id} className='mt-5'>
                  <div className='m-2'>
                    <CourseCard {...course} />
                  </div>
                </Link>
              ))
            ) : (
              <div className='text-center pt-8 pb-14 mt-8'>
                <MdSentimentDissatisfied
                  className='mx-auto text-gray-500 mb-4'
                  size={58}
                />
                <p className='text-gray-500 text-lg'>
                  No results found for the search query.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCourse;
