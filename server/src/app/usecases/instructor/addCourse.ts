import { CourseDbRepositoryInterface } from '../../../app/repositories/courseDbRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { AddCourseInfoInterface } from '../../../types/instructor/courseInterface';
import AppError from '../../../utils/appError';

export const addCourses = async (
  courseInfo:AddCourseInfoInterface,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if(!courseInfo){
    throw new AppError("Please provide course details",HttpStatusCodes.BAD_REQUEST)
  }
  const response = await courseDbRepository.addCourse(courseInfo);
  return response
};
