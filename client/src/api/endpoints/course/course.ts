import END_POINTS from "../../../constants/endpoints";
import {
  addCourseService,
  enrollStudentService,
  getAllCoursesService,
  getIndividualCourseService,
  getRecommendedCoursesService,
  getTrendingCoursesService,
} from "../../services/course/courseService";
import { getCoursesByInstructorService } from "../../services/course/courseService";
import { PaymentIntent } from "@stripe/stripe-js";

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
