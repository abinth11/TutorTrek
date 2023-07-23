import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { EditCourseInfo } from '../../../types/courseInterface';
import AppError from '../../../utils/appError';

export const editCourseU = async (
  courseId: string,
  courseInfo: EditCourseInfo,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!courseId) {
    throw new AppError(
      'Please provide course id ',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  if (!courseInfo) {
    throw new AppError(
      'Please provide course details',
      HttpStatusCodes.BAD_REQUEST
    );
  }
 const response =  await courseDbRepository.editCourse(courseId, courseInfo);

  return response;
};
