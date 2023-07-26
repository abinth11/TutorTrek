import express from 'express';
import studentController from '../../.././adapters/controllers/studentController';
import { studentDbRepository } from '../../../app/repositories/studentDbRepository';
import { studentRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { authService } from '../../../frameworks/services/authService';
import { authServiceInterface } from '../../../app/services/authServicesInterface';
import { cloudServiceInterface } from '../../../app/services/cloudServiceInterface';
import { s3Service } from '../../../frameworks/services/s3CloudService';
import upload from '../middlewares/multer';
import { RedisClient } from '@src/app';
import { cachingMiddleware } from '../middlewares/redisCaching';
import { redisCacheRepository } from '../../../frameworks/database/redis/redisCacheRepository';
import { cacheRepositoryInterface } from '../../../app/repositories/cachedRepoInterface';
import jwtAuthMiddleware from '../middlewares/userAuth';

const studentRouter = (redisClient: RedisClient) => {
  const router = express.Router();
  const controller = studentController(
    authServiceInterface,
    authService,
    studentDbRepository,
    studentRepositoryMongoDB,
    cloudServiceInterface,
    s3Service,
    cacheRepositoryInterface,
    redisCacheRepository,
    redisClient
  );
  router.patch('/change-password', controller.changePassword);

  router.put(
    '/update-profile',
    upload.single('image'),
    controller.updateProfile
  );

  router.get(
    '/get-student-details',
    jwtAuthMiddleware,
    cachingMiddleware(redisClient),
    controller.getStudentDetails
  );

  router.get('/get-profile-url', controller.getProfileUrl);

  router.get('/get-all-students', controller.getAllStudents);

  router.patch('/block-student/:studentId', controller.blockStudent);

  router.patch('/unblock-student/:studentId', controller.unblockStudent);

  router.get('/get-all-blocked-students', controller.getAllBlockedStudents);

  return router;
};
export default studentRouter;
