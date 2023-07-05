import END_POINTS from "../../../constants/endpoints";
import {
  getAllCoursesService,
  getIndividualCourseService,
} from "../../services/course/course";

export const getAllCourses = () => {
  return getAllCoursesService(END_POINTS.GET_ALL_COURSES);
};

export const getIndividualCourse = (courseId: string) => {
  return getIndividualCourseService(END_POINTS.GET_COURSE, courseId);
};
