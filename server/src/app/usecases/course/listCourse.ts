import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';

export const getAllCourseU = async (
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  const courses = await courseDbRepository.getAllCourse();
  return courses;
};

export const getCourseByIdU = async (
  courseId: string,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!courseId) {
    throw new AppError(
      'Please provide a course id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const course = await courseDbRepository.getCourseById(courseId);
  return course;
};

export const getCourseByStudentU = async (
  studentId: string|undefined,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!studentId) {
    throw new AppError('Invalid student id ', HttpStatusCodes.BAD_REQUEST);
  }
  const course = await courseDbRepository.getCourseByStudent(studentId);
  return course;
};
