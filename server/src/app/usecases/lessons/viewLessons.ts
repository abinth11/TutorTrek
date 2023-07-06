import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { LessonDbRepositoryInterface } from '@src/app/repositories/lessonDbRepository';

export const getLessonsByCourseIdU = async (
  courseId: string,
  lessonDbRepository: ReturnType<LessonDbRepositoryInterface>
) => {
  if (!courseId) {
    throw new AppError(
      'Please provide a valid course id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const lessons = await lessonDbRepository.getLessonsByCourseId(courseId);
  return lessons;
};
