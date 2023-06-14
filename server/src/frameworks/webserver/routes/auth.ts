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
import { adminDbRepository } from "../../../../src/app/repositories/adminDbRepository";
import { adminRepoMongoDb } from "../../../../src/frameworks/database/mongodb/repositories/adminRepoMongoDb";
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
    googleAuthService,
    adminDbRepository,
    adminRepoMongoDb
  );
  //* Student
  router.post("/student-register",controller.registerStudent)
  router.post("/student-login", controller.loginStudent);
  router.post("/login-with-google",controller.loginWithGoogle)
  
  //* Instructor
  router.post("/instructor/instructor-register",controller.registerInstructor)
  router.post("/instructor/instructor-login",controller.loginInstructor)

  //* Admin 
  router.post("/admin/admin-login",controller.loginAdmin)

  return router;
};

export default authRouter;
