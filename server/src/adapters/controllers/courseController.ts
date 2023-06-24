import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { CourseRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { CourseDbRepositoryInterface } from '../../app/repositories/courseDbRepository';
import { addCourses } from '../../app/usecases/instructor/addCourse';
import { AddCourseInfoInterface } from '../../types/instructor/courseInterface';
import { CustomRequest } from '@src/types/custom/customRequest';
import { getAllCourseU, getCourseByIdU } from '@src/app/usecases/listCourse';
const courseController = (
  courseDbRepository: CourseDbRepositoryInterface,
  courseDbRepositoryImpl: CourseRepositoryMongoDbInterface
) => {
  const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl());

  const addCourse = asyncHandler(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const course: AddCourseInfoInterface = req.body;
      const files: Express.Multer.File[] = req.files as Express.Multer.File[];
      const instructorId = req.user?.instructorId;
      if (instructorId) {
        course.instructorId = instructorId;
      }
      if (files) {
        const images = files
          .filter((file) => file.mimetype.startsWith('image/'))
          .map((file) => file.path);
        const videos = files
          .filter((file) => file.mimetype.startsWith('video/'))
          .map((file) => file.path);

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

  const getAllCourses = asyncHandler(async (req: Request, res: Response) => {
    const courses = await getAllCourseU(dbRepositoryCourse)
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved all courses',
      data: courses
    });
  });

  const getIndividualCourse = asyncHandler(async(req:Request,res:Response)=>{
    const courseId:string = req.params.courseId
    const course = await getCourseByIdU(courseId,dbRepositoryCourse)
    res.status(200).json({
      status:'success',
      message:'Successfully retrieved the course',
      data:course
    })
  })

  return {
    addCourse,
    getAllCourses,
    getIndividualCourse
  };
};

export default courseController;
