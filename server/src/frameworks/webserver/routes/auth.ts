import express from "express";
import {studentDbRepository} from '../../../app/repositories/studentDbRepository'
import {studentRepositoryMongoDB} from '../../../frameworks/database/mongodb/repositories/studentsRepoMongoDb'
import authController from "../../../adapters/controllers/authController";
import { authServiceInterface } from "../../../app/services/authServicesInterface";
import { authService } from "../../services/authService";
import {googleAuthService} from "../../../frameworks/services/googleAuthService"
import { googleAuthServiceInterface } from "../../../app/services/googleAuthServicesInterface";
import {instructorDbRepository} from "../../../app/repositories/instructorDbRepository"
import {instructorRepoMongoDb} from "../../../frameworks/database/mongodb/repositories/instructorRepoMongoDb"
import { adminDbRepository } from "../../../app/repositories/adminDbRepository";
import { adminRepoMongoDb } from "../../../frameworks/database/mongodb/repositories/adminRepoMongoDb";
import { refreshTokenDbRepository } from "../../../app/repositories/refreshTokenDBRepository";
import { refreshTokenRepositoryMongoDB } from "../../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb";
import { s3Service } from "../../../frameworks/services/s3CloudService";
import { cloudServiceInterface } from "../../../app/services/cloudServiceInterface";
import upload from "../middlewares/multer";
const authRouter = () => {     
  const router = express.Router();
  
  const controller = authController(
    authServiceInterface,
    authService,
    cloudServiceInterface,
    s3Service,
    studentDbRepository,
    studentRepositoryMongoDB,  
    instructorDbRepository,  
    instructorRepoMongoDb,
    googleAuthServiceInterface,
    googleAuthService,
    adminDbRepository,
    adminRepoMongoDb,
    refreshTokenDbRepository,
    refreshTokenRepositoryMongoDB
  );
  //* Student
  router.post("/student-register",controller.registerStudent)
  router.post("/student-login", controller.loginStudent);
  router.post("/login-with-google",controller.loginWithGoogle)
  
  //* Instructor
  router.post("/instructor/instructor-register",upload.array('images'), controller.registerInstructor)
  router.post("/instructor/instructor-login",controller.loginInstructor)

  //* Admin 
  router.post("/admin/admin-login",controller.loginAdmin)

  return router;
};

export default authRouter;
