import express from 'express';
import courseController from '../../../adapters/controllers/courseController';
import { courseRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { courseDbRepository } from '../../../app/repositories/courseDbRepository';
import { uploadImageAndVideo } from '../middlewares/imageUpload';
import { instructorRoleCheckMiddleware, studentRoleCheckMiddleware } from '../middlewares/roleCheckMiddleware';
import { cloudServiceInterface } from '../../../app/services/cloudServiceInterface';
import { s3Service } from '../../../frameworks/services/s3CloudService';
import upload from '../middlewares/multer';
import { quizDbRepository } from '../../../app/repositories/quizDbRepository';
import { quizRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/quizzDbRepository';
import { lessonDbRepository } from '../../../app/repositories/lessonDbRepository';
import { lessonRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/lessonRepoMongodb';
import { discussionDbRepository } from '../../../app/repositories/discussionDbRepository';
import { discussionRepositoryMongoDb } from '../../../frameworks/database/mongodb/repositories/discussionsRepoMongodb';
import { paymentRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/paymentRepoMongodb';
import { paymentInterface } from '../../../app/repositories/paymentDbRepository';
import jwtAuthMiddleware from '../middlewares/userAuth';
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
    discussionRepositoryMongoDb,
    paymentInterface,
    paymentRepositoryMongodb
  );
  //* Add course
  router.post(
    '/instructors/add-course',
    jwtAuthMiddleware,
    instructorRoleCheckMiddleware,
    uploadImageAndVideo,
    controller.addCourse
  );

  router.get('/get-all-courses', controller.getAllCourses);

  router.get('/get-course/:courseId', controller.getIndividualCourse);

  router.get(
    '/get-course-by-instructor',
    jwtAuthMiddleware,
    instructorRoleCheckMiddleware,
    controller.getCoursesByInstructor
  );

  router.post(
    '/instructors/add-lesson/:courseId',
    jwtAuthMiddleware,
    instructorRoleCheckMiddleware,
    upload.array('media'),
    controller.addLesson
  );

  router.get(
    '/instructors/get-lessons-by-course/:courseId',
    controller.getLessonsByCourse
  );

  router.get('/get-lessons-by-id/:lessonId', controller.getLessonById);

  router.get('/get-quizzes-by-lesson/:lessonId', controller.getQuizzesByLesson);

  router.post(
    '/lessons/add-discussion/:lessonId',
    jwtAuthMiddleware,
    controller.addDiscussion
  );

  router.get(
    '/lessons/get-discussions-by-lesson/:lessonId',
    controller.getDiscussionsByLesson
  );

  router.patch(
    '/lessons/edit-discussion/:discussionId',
    jwtAuthMiddleware,
    controller.editDiscussions
  );

  router.delete(
    '/lessons/delete-discussion/:discussionId',
    jwtAuthMiddleware,
    controller.deleteDiscussion
  );

  router.put(
    '/lessons/reply-discussion/:discussionId',
    jwtAuthMiddleware,
    controller.replyDiscussion
  );

  router.get(
    '/lesson/replies-based-on-discussion/:discussionId',
    controller.getRepliesByDiscussion
  );

  router.post(
    '/enroll-student/:courseId',
    jwtAuthMiddleware,
    controller.enrollStudent
  );

  router.get(
    '/get-recommended-courses',
    jwtAuthMiddleware,
    studentRoleCheckMiddleware,
    controller.getRecommendedCourseByStudentInterest
  );

  router.get('/get-trending-courses', controller.getTrendingCourses);

  router.get('/get-course-by-student',jwtAuthMiddleware,controller.getCourseByStudent)

  return router;
};
export default courseRouter;
