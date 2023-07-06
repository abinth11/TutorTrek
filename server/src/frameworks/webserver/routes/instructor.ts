import express from 'express';
import { instructorRepoMongoDb } from '../../../frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { sendEmailServiceInterface } from '../../../app/services/sendEmailServiceInterface';
import { sendEmailService } from '../../../frameworks/services/sendEmailService';
import { instructorDbRepository } from '../../../app/repositories/instructorDbRepository';
import instructorController from '../../../adapters/controllers/instructorController';

const instructorRouter = () => {
  const router = express.Router();
  const controller = instructorController(
    instructorDbRepository,
    instructorRepoMongoDb,
    sendEmailServiceInterface,
    sendEmailService
  );
  //* Instructor management
  router.get(
    '/view-instructor-requests',
    controller.getInstructorRequests
  );

  router.patch(
    '/accept-instructor-request/:instructorId',
    controller.verifyInstructor
  );

  router.put(
    '/reject-instructor-request',
    controller.rejectRequest
  );

  router.get('/get-all-instructors', controller.getAllInstructor);

  router.patch(
    '/get-all-instructors/block-instructors',
    controller.blockInstructor
  );

  router.patch(
    '/get-all-instructors/unblock-instructors/:instructorId',
    controller.unblockInstructor
  );

  router.get(
    '/get-blocked-instructors',
    controller.getBlockedInstructor
  );

  router.get(
    '/view-instructor-requests/:instructorId',
    controller.getInstructorById
  );

  return router;
};

export default instructorRouter;
