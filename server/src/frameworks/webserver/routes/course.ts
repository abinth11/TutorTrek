import express from 'express';
import courseController from '../../../adapters/controllers/courseController';
import { courseRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { courseDbRepository } from '../../../app/repositories/courseDbRepository';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';
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
import { redisCacheRepository } from '../../../frameworks/database/redis/redisCacheRepository';
import { cacheRepositoryInterface } from '../../../app/repositories/cachedRepoInterface';
import { RedisClient } from '../../../app';
import { cachingMiddleware } from '../middlewares/redisCaching';

const courseRouter = (redisClient: RedisClient) => {
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
    paymentRepositoryMongodb,
    cacheRepositoryInterface,
    redisCacheRepository,
    redisClient
  );
  //* Add course
  router.post(
    '/instructors/add-course',
    jwtAuthMiddleware,
    roleCheckMiddleware('instructor'),
    upload.array('files'),
    controller.addCourse
  );

  router.put(
    '/instructors/edit-course/:courseId',
    jwtAuthMiddleware,
    roleCheckMiddleware('instructor'),
    upload.array('files'),
    controller.editCourse
  );

  router.get(
    '/get-all-courses',
    cachingMiddleware(redisClient, 'all-courses'), 
    controller.getAllCourses
  );

  router.get('/get-course/:courseId', controller.getIndividualCourse);

  router.get(
    '/get-course-by-instructor',
    jwtAuthMiddleware,
    roleCheckMiddleware('instructor'),
    controller.getCoursesByInstructor
  );

  router.post(
    '/instructors/add-lesson/:courseId',
    jwtAuthMiddleware,
    roleCheckMiddleware('instructor'),
    upload.array('media'),
    controller.addLesson
  );

  router.put(
    '/instructors/edit-lesson/:lessonId',
    jwtAuthMiddleware,
    roleCheckMiddleware('instructor'),
    upload.array('media'),
    controller.editLesson
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
    roleCheckMiddleware('student'),
    controller.getRecommendedCourseByStudentInterest
  );

  router.get('/get-trending-courses', controller.getTrendingCourses);

  router.get(
    '/get-course-by-student',
    jwtAuthMiddleware,
    controller.getCourseByStudent
  );

  router.get(
    '/search-course',
    cachingMiddleware(redisClient),
    controller.searchCourse
  );

  return router;
};
export default courseRouter;
