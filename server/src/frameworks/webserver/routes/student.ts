import express from 'express';
import studentController from '../../.././adapters/controllers/studentController';
import { studentDbRepository } from '../../../app/repositories/studentDbRepository';
import { studentRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { authService } from '../../../frameworks/services/authService';
import { authServiceInterface } from '../../../app/services/authServicesInterface';
import { cloudServiceInterface } from '../../../app/services/cloudServiceInterface';
import { s3Service } from '../../../frameworks/services/s3CloudService';
import upload from '../middlewares/multer';

const studentRouter = () => {
  const router = express.Router();
  const controller = studentController(
    authServiceInterface,
    authService,
    studentDbRepository,
    studentRepositoryMongoDB,
    cloudServiceInterface,
    s3Service,
  );
  router.patch('/change-password', controller.changePassword);
  
  router.put('/update-profile',upload.single('image'),controller.updateProfile);

  router.get('/get-student-details',controller.getStudentDetails)

  router.get('/get-profile-url',controller.getProfileUrl)

  return router;
};
export default studentRouter;
