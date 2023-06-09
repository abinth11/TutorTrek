import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../app/services/authServicesInterface";
import { StudentsDbInterface } from "../../app/repositories/studentDbRepository";
import { StudentRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/studentsRepoMongoDb";
import {
  studentLogin,
  studentRegister,
} from "../../app/usecases/auth/studentAuth";
import { StudentRegisterInterface } from "@src/types/student/studentRegisterInterface";
import generateJsonResponse from "../Helpers/generateJsonResponse";
import sendJsonResponse from "../Helpers/generateJsonResponse";

const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  studentDbRepository: StudentsDbInterface,
  studentDbRepositoryImpl: StudentRepositoryMongoDB
) => {
  const dbRepositoryUser = studentDbRepository(studentDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const registerStudent = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const student: StudentRegisterInterface = req.body;
    const token = await studentRegister(student, dbRepositoryUser, authService);
    res.json(sendJsonResponse('success','Successfully registered the user',token))
  });

  const loginStudent = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const token = await studentLogin(
      email,
      password,
      dbRepositoryUser,
      authService
    );
    res.json(sendJsonResponse("success", "user verified", token));
  });

  return {
    loginStudent,
    registerStudent,
  };
};

export default authController;
