import express from "express";
import {studentDbRepository} from '../../../app/repositories/studentDbRepository'
import {studentRepositoryMongoDB} from '../../../frameworks/database/mongodb/repositories/studentsRepoMongoDb'
import authController from "../../../adapters/controllers/authController";
import { authServiceInterface } from "../../../app/services/authServicesInterface";
import { authService } from "../../services/authService";

const authRouter = () => {
  const router = express.Router();

  const controller = authController(
    authServiceInterface,
    authService,
    studentDbRepository,
    studentRepositoryMongoDB
  );

  router.post("/student-login", controller.loginStudent);

  return router;
};

export default authRouter;
