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
  if (!instructorId || !courseInfo || !files || files.length === 0) {
    throw new AppError('Invalid input data', HttpStatusCodes.BAD_REQUEST);
  }
  console.log(files);

  const uploadPromises = files.map(async (file) => {
    let uploadedFile;

    if (file.mimetype === 'application/pdf') {
      uploadedFile = await cloudService.upload(file);
      courseInfo.guidelines = uploadedFile;
    }

    if (file.mimetype === 'video/mp4') {
      uploadedFile = await cloudService.upload(file);
      courseInfo.introduction = uploadedFile;
    }

    if (file.mimetype.includes('image')) {
      uploadedFile = await cloudService.upload(file);
      courseInfo.thumbnail = uploadedFile;
    }
  });

  await Promise.all(uploadPromises);

  courseInfo.instructorId = instructorId;

  if (typeof courseInfo.tags === 'string') {
    courseInfo.tags = courseInfo.tags.split(',');
  }
  if (typeof courseInfo.syllabus === 'string') {
    courseInfo.syllabus = courseInfo.syllabus.split(',');
  }
  if (typeof courseInfo.requirements === 'string') {
    courseInfo.requirements = courseInfo.requirements.split(',');
  }
  console.log(courseInfo)
  const courseId = await courseDbRepository.addCourse(courseInfo);

  if (!courseId) {
    throw new AppError(
      'Unable to add course',
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  return courseId;
};
