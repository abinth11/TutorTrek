import { CourseDbRepositoryInterface } from '../../../app/repositories/courseDbRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';

export const getCourseByInstructorU = async (
  instructorId: string | undefined,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!instructorId && instructorId !== '') {
    throw new AppError(
      'Please provide an instructor id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const courses = await courseDbRepository.getCourseByInstructorId(
    instructorId
  );
  return courses;
};
