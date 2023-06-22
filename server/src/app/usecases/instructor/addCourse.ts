import { CourseDbRepositoryInterface } from '../../../app/repositories/courseDbRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { AddCourseInfoInterface } from '../../../types/instructor/courseInterface';
import AppError from '../../../utils/appError';

export const addCourses = async (
  courseInfo: AddCourseInfoInterface,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!courseInfo) {
    throw new AppError(
      'Please provide course details',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const courseId = await courseDbRepository.addCourse(courseInfo);
  if (!courseId) {
    throw new AppError(
      'Unable to add course please try again',
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  const { quiz } = courseInfo;
  if (!quiz) {
    throw new AppError(
      'Please add quiz to upload the course',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  if (courseId) {
    await courseDbRepository.addQuiz(courseId.toString(), quiz);
  }
  return courseId;
};
