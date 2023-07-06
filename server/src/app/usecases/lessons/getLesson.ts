import AppError from '../../../utils/appError';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { LessonDbRepositoryInterface } from '@src/app/repositories/lessonDbRepository';

export const getLessonByIdU = async (
  lessonId: string,
  lessonDbRepository: ReturnType<LessonDbRepositoryInterface>
) => {
  if (!lessonId) {
    throw new AppError(
      'Please provide a lesson id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const lesson = await lessonDbRepository.getLessonById(lessonId);
  return lesson;
};
