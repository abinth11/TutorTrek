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
import { contactDbInterface } from '../../../app/repositories/contactDbRepository';
import { contactRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/contactsRepoMongoDb';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';

const studentRouter = (redisClient: RedisClient) => {
  const router = express.Router();
  const controller = studentController(
    authServiceInterface,
    authService,
    studentDbRepository,
    studentRepositoryMongoDB,
    contactDbInterface,
    contactRepositoryMongodb,
    cloudServiceInterface,
    s3Service,
    cacheRepositoryInterface,
    redisCacheRepository,
    redisClient
  );
  router.patch(
    '/change-password',
    jwtAuthMiddleware,
    controller.changePassword
  );

  router.put(
    '/update-profile',
    jwtAuthMiddleware,
    upload.single('image'),
    controller.updateProfile
  );

  router.get(
    '/get-student-details',
    jwtAuthMiddleware,
    cachingMiddleware(redisClient),
    controller.getStudentDetails
  );

  router.get('/get-all-students', jwtAuthMiddleware, controller.getAllStudents);

  router.patch(
    '/block-student/:studentId',
    jwtAuthMiddleware,
    roleCheckMiddleware('admin'),
    controller.blockStudent
  );

  router.patch(
    '/unblock-student/:studentId',
    jwtAuthMiddleware,
    roleCheckMiddleware('admin'),
    controller.unblockStudent
  );

  router.get(
    '/get-all-blocked-students',
    jwtAuthMiddleware,
    roleCheckMiddleware('admin'),
    controller.getAllBlockedStudents
  );

  router.post('/contact-us', controller.addContact);

  return router;
};
export default studentRouter;
