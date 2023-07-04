import express from 'express';
import courseController from '../../../adapters/controllers/courseController';
import { courseRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { courseDbRepository } from '../../../app/repositories/courseDbRepository';
import { uploadImageAndVideo } from '../middlewares/imageUpload';
import { instructorRoleCheckMiddleware } from '../middlewares/roleCheckMiddleware';
import { cloudServiceInterface } from '../../../app/services/cloudServiceInterface';
import { s3Service } from '../../../frameworks/services/s3CloudService';
import upload from '../middlewares/multer';

const courseRouter = () => {
  const router = express.Router();
  const controller = courseController( 
    cloudServiceInterface,
    s3Service,
    courseDbRepository,
    courseRepositoryMongodb
  );
  //* Add course 
  router.post('/instructors/add-course',instructorRoleCheckMiddleware,uploadImageAndVideo,controller.addCourse)

  router.get('/get-all-courses',controller.getAllCourses)

  router.get('/get-course/:courseId',controller.getIndividualCourse)

  router.get('/get-course-by-instructor',instructorRoleCheckMiddleware,controller.getCoursesByInstructor)

  router.post('/instructors/add-lesson/:courseId',instructorRoleCheckMiddleware,upload.array("media"),controller.addLesson)

  router.get('/instructors/get-lessons-by-course/:courseId',instructorRoleCheckMiddleware,controller.getLessonsByCourse)  
  return router
};
export default courseRouter
