import express from 'express';
import courseController from '../../../adapters/controllers/courseController';
import { courseRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { courseDbRepository } from '../../../app/repositories/courseDbRepository';
import { uploadImageAndVideo } from '../middlewares/imageUpload';
import { instructorRoleCheckMiddleware } from '../middlewares/roleCheckMiddleware';
import { cloudServiceInterface } from '../../../app/services/cloudServiceInterface';
import { s3Service } from '../../../frameworks/services/s3CloudService';
import upload from '../middlewares/multer';
import { quizDbRepository } from '../../../app/repositories/quizDbRepository';
import { quizRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/quizzDbRepository';
import { lessonDbRepository } from '../../../app/repositories/lessonDbRepository';
import { lessonRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/lessonRepoMongodb';
import { discussionDbRepository } from '../../../app/repositories/discussionDbRepository';
import { discussionRepositoryMongoDb } from '../../../frameworks/database/mongodb/repositories/discussionsRepoMongodb';
const courseRouter = () => {
  const router = express.Router();
  const controller = courseController( 
    cloudServiceInterface,
    s3Service,
    courseDbRepository,
    courseRepositoryMongodb,
    quizDbRepository,
    quizRepositoryMongodb,
    lessonDbRepository,
    lessonRepositoryMongodb,
    discussionDbRepository,
    discussionRepositoryMongoDb
  );
  //* Add course 
  router.post('/instructors/add-course',instructorRoleCheckMiddleware,uploadImageAndVideo,controller.addCourse)

  router.get('/get-all-courses',controller.getAllCourses)

  router.get('/get-course/:courseId',controller.getIndividualCourse)

  router.get('/get-course-by-instructor',instructorRoleCheckMiddleware,controller.getCoursesByInstructor)

  router.post('/instructors/add-lesson/:courseId',instructorRoleCheckMiddleware,upload.array("media"),controller.addLesson)

  router.get('/instructors/get-lessons-by-course/:courseId',controller.getLessonsByCourse)

  router.get('/get-lessons-by-id/:lessonId',controller.getLessonById)

  router.get('/get-quizzes-by-lesson/:lessonId',controller.getQuizzesByLesson)

  router.post('/lessons/add-discussion/:lessonId',controller.addDiscussion)

  return router
};
export default courseRouter
