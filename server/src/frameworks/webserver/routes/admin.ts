import express from 'express';
import adminController from '../../../adapters/controllers/adminController';
import { adminRepoMongoDb } from '../../../frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { adminDbRepository } from '../../../app/repositories/adminDbRepository';

const adminRouter = () => {
  const router = express.Router();
  const controller = adminController(adminDbRepository, adminRepoMongoDb);
  //* Instructor management
  router.get(
    '/instructors/view-instructor-requests',
    controller.getInstructorRequests
  );
  return router;
};

export default adminRouter;
