import express from 'express';
import courseController from '../../../adapters/controllers/courseController';
import { courseRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { courseDbRepository } from '../../../app/repositories/courseDbRepository';
import { uploadImageAndVideo } from '../middlewares/imageUpload';
import { instructorRoleCheckMiddleware } from '../middlewares/roleCheckMiddleware';

const courseRouter = () => {
  const router = express.Router();
  const controller = courseController( 
    courseDbRepository,
    courseRepositoryMongodb
  );
  //* Add course 
  router.post('/instructors/add-course',instructorRoleCheckMiddleware,uploadImageAndVideo,controller.addCourse)

  router.get('/get-all-courses',controller.getAllCourses)

  router.get('/get-course/:courseId',controller.getIndividualCourse)

  router.get('/get-course-by-instructor',instructorRoleCheckMiddleware,controller.getCoursesByInstructor)

  router.post('/instructors/add-lessons/:courseId',instructorRoleCheckMiddleware,controller.addLesson)

  router.post('/instructors/add-quiz/:lessonId',instructorRoleCheckMiddleware,controller.addQuiz)
  
  return router
};
export default courseRouter
