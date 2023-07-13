import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';

export const getRecommendedCourseByStudentU = async (
    studentId:string,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  console.log(studentId)
    if(!studentId){
        throw new AppError("Please provide a valid student id ",HttpStatusCodes.BAD_REQUEST)
    }
  const courses = await courseDbRepository.getRecommendedCourseByStudentInterest(studentId)
  return courses;
};

export const getTrendingCourseU = async (
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  const course = await courseDbRepository.getTrendingCourse()
  return course;
};
