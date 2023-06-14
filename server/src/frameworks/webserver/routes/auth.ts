import express from "express";
import {studentDbRepository} from '../../../app/repositories/studentDbRepository'
import {studentRepositoryMongoDB} from '../../../frameworks/database/mongodb/repositories/studentsRepoMongoDb'
import authController from "../../../adapters/controllers/authController";
import { authServiceInterface } from "../../../app/services/authServicesInterface";
import { authService } from "../../services/authService";
import {googleAuthService} from "../../../frameworks/services/googleAuthService"
import { googleAuthServiceInterface } from "../../../app/services/googleAuthServicesInterface";
import {instructorDbRepository} from "../../../../src/app/repositories/instructorDbRepository"
import {instructorRepoMongoDb} from "../../../frameworks/database/mongodb/repositories/instructorRepoMongoDb"
const authRouter = () => {     
  const router = express.Router();
  
  const controller = authController(
    authServiceInterface,
    authService,  
    studentDbRepository,
    studentRepositoryMongoDB,  
    instructorDbRepository,  
    instructorRepoMongoDb,
    googleAuthServiceInterface,
    googleAuthService
  );
  //* Student
  router.post("/student-register",controller.registerStudent)
  router.post("/student-login", controller.loginStudent);
  router.post("/login-with-google",controller.loginWithGoogle)
  
  //* Instructor
  router.post("/instructor/instructor-register",controller.registerInstructor)

  return router;
};

export default authRouter;
