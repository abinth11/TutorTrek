import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';

export const getLessonsByCourseIdU = async (
  courseId: string,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!courseId) {
    throw new AppError(
      'Please provide a valid course id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const lessons = await courseDbRepository.getLessonsByCourseId(courseId);
  return lessons
};
