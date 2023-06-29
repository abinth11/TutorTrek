import { CourseDbRepositoryInterface } from '../../../app/repositories/courseDbRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { CreateLessonInterface } from '../../../types/instructor/lesson';
export const addLessonsU = async (
  courseId: string|undefined,
  instructorId: string,
  lesson: CreateLessonInterface,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!courseId) {
    throw new AppError(
      'Please provide an course id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  if (!instructorId && instructorId !== '') {
    throw new AppError(
      'Please provide an instructor id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  if(!lesson){
    throw new AppError(
        'Data is not provided',
        HttpStatusCodes.BAD_REQUEST
      );
  }
  await courseDbRepository.addLesson(courseId,instructorId,lesson)

};
