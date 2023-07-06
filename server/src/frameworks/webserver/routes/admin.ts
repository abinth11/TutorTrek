import express from 'express';
import adminController from '../../../adapters/controllers/adminController';
import { adminRepoMongoDb } from '../../../frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { adminDbRepository } from '../../../app/repositories/adminDbRepository';
import { sendEmailServiceInterface } from '../../../app/services/sendEmailServiceInterface';
import { sendEmailService } from '../../../frameworks/services/sendEmailService';
import { adminRoleCheckMiddleware } from '../middlewares/roleCheckMiddleware';

const adminRouter = () => {
  const router = express.Router();
  const controller = adminController(
    adminDbRepository,
    adminRepoMongoDb,
    sendEmailServiceInterface,
    sendEmailService
  );
 
  return router;
};

export default adminRouter;
