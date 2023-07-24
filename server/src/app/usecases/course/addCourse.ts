import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { AddCourseInfoInterface } from '../../../types/courseInterface';
import AppError from '../../../utils/appError';
import { CloudServiceInterface } from '@src/app/services/cloudServiceInterface';

export const addCourses = async (
  instructorId: string | undefined,
  courseInfo: AddCourseInfoInterface,
  files: Express.Multer.File[],
  cloudService: ReturnType<CloudServiceInterface>,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!instructorId) {
    throw new AppError('Please provide instructor id', HttpStatusCodes.BAD_REQUEST);
  }

  if (!courseInfo) {
    throw new AppError('Please provide course details', HttpStatusCodes.BAD_REQUEST);
  }

  if (files && files.length > 0) {
    const uploadPromises = files.map(async (file) => {
      if (file.mimetype === 'application/pdf') {
        const guidelines = await cloudService.upload(file);
        courseInfo.guidelines = guidelines;
      } else {
        const thumbnail = await cloudService.upload(file);
        courseInfo.thumbnail = thumbnail;
      }
    });

    await Promise.all(uploadPromises);
  }

  courseInfo.instructorId = instructorId;

  if (typeof courseInfo.tags==='string') {
    courseInfo.tags = courseInfo.tags.split(',');
  }

  if (typeof courseInfo.syllabus==='string') {
    courseInfo.syllabus = courseInfo.syllabus.split(',');
  }

  if (typeof courseInfo.requirements==='string') {
    courseInfo.requirements = courseInfo.requirements.split(',');
  }


  const courseId = await courseDbRepository.addCourse(courseInfo);

  if (!courseId) {
    throw new AppError('Unable to add course, please try again', HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }

  return courseId;
};
