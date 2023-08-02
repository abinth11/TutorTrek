import END_POINTS from "../../../constants/endpoints";
import {
  addCourseService,
  editCourseService,
  enrollStudentService,
  getAllCoursesService,
  getCourseByStudentService,
  getIndividualCourseService,
  getRecommendedCoursesService,
  getTrendingCoursesService,
  searchCourseService,
} from "../../services/course/course-service";
import { getCoursesByInstructorService } from "../../services/course/course-service";
import { PaymentIntent } from "@stripe/stripe-js";

export const addCourse = (courseInfo: FormData) => {
  return addCourseService(END_POINTS.ADD_COURSE, courseInfo);
};

export const editCourse = (courseId: string, courseInfo: FormData) => {
  return editCourseService(END_POINTS.EDIT_COURSE, courseId, courseInfo);
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

export const enrollStudent = (
  courseId: string,
  paymentInfo?: PaymentIntent
) => {
  return enrollStudentService(END_POINTS.ENROLL_STUDENT, courseId, paymentInfo);
};

export const getRecommendedCourses = () => {
  return getRecommendedCoursesService(END_POINTS.GET_RECOMMENDED_COURSES);
};

export const getTrendingCourses = () => {
  return getTrendingCoursesService(END_POINTS.GET_TRENDING_COURSES);
};

export const getCourseByStudent = () => {
  return getCourseByStudentService(END_POINTS.GET_COURSE_BY_STUDENT);
};

export const searchCourse = (searchQuery: string, filterQuery: string) => {
  return searchCourseService(
    END_POINTS.SEARCH_COURSE,
    searchQuery,
    filterQuery
  );
};
