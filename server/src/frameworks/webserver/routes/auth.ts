import express from "express";
import {studentDbRepository} from '../../../app/repositories/studentDbRepository'
import {studentRepositoryMongoDB} from '../../../frameworks/database/mongodb/repositories/studentsRepoMongoDb'
import authController from "../../../adapters/controllers/authController";
import { authServiceInterface } from "../../../app/services/authServicesInterface";
import { authService } from "../../services/authService";
import {googleAuthService} from "../../../frameworks/services/googleAuthService"
import { googleAuthServiceInterface } from "../../../app/services/googleAuthServicesInterface";
const authRouter = () => {
  const router = express.Router();

  const controller = authController(
    authServiceInterface,
    authService,
    studentDbRepository,
    studentRepositoryMongoDB,
    googleAuthServiceInterface,
    googleAuthService
  );
  router.post('/student-register',controller.registerStudent)
  router.post("/student-login", controller.loginStudent);
  router.post('/login-with-google',controller.loginWithGoogle)


  return router;
};

export default authRouter;
