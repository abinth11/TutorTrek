import END_POINTS from "../../../constants/endpoints";
import {
  addCourseService,
  getAllCoursesService,
  getIndividualCourseService
} from "../../services/course/courseService";
import { getCoursesByInstructorService } from "../../services/course/courseService";
     

export const addCourse = (courseInfo: any) => {
  return addCourseService(END_POINTS.ADD_COURSE, courseInfo);
};

export const getCourseByInstructor = () => {
  return getCoursesByInstructorService(END_POINTS.GET_COURSES_BY_INSTRUCTORS);
};

export const getAllCourses = () => {
  return getAllCoursesService(END_POINTS.GET_ALL_COURSES);
};

export const getIndividualCourse = (courseId: string) => {
  return getIndividualCourseService(END_POINTS.GET_COURSE, courseId);
};


