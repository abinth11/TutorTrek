import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { CourseRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { CourseDbRepositoryInterface } from '../../app/repositories/courseDbRepository';
import { addCourses } from '../../app/usecases/instructor/addCourse';
import { AddCourseInfoInterface } from '../../types/instructor/courseInterface';
import { CustomRequest } from '@src/types/custom/customRequest';
// import { handleFileUpload } from '../Helpers/handleFileUpload';

const courseController = (
  courseDbRepository: CourseDbRepositoryInterface,
  courseDbRepositoryImpl: CourseRepositoryMongoDbInterface
) => {
  const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl());

  const addCourse = asyncHandler(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      console.log(req.body)
      const course: AddCourseInfoInterface = req.body;
      console.log(course)
      const files: Express.Multer.File[] = req.files as Express.Multer.File[];
      console.log(files)
      const instructorId = req.user?.instructorId
      if(instructorId){
        course.instructorId = instructorId
      }
      if (files) {
        const images = files.filter(file => file.mimetype.startsWith('image/')).map(file => file.path);
        const videos = files.filter(file => file.mimetype.startsWith('video/')).map(file => file.path);
    
        if (images.length > 0) {
          course.thumbnail = images[0];
        }
        if (videos.length > 0) {
          course.introductionVideo = videos[0];
        }
      }
      const response = await addCourses(course, dbRepositoryCourse);
      res.status(200).json({
        status: 'success',
        message:
          'Successfully added new course, course will be published after verification',
        data: response
      });
    }
  );

  return {
    addCourse
  };
};

export default courseController;
