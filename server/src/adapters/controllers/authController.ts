import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../app/services/authServicesInterface";
import { StudentsDbInterface } from "../../app/repositories/studentDbRepository";
import { StudentRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/studentsRepoMongoDb";
import {
  studentLogin,
  studentRegister,
  signInWithGoogle
} from "../../app/usecases/auth/studentAuth";
import { StudentRegisterInterface } from "@src/types/student/studentRegisterInterface";
import sendJsonResponse from "../Helpers/generateJsonResponse";
import { GoogleAuthServiceInterface } from "@src/app/services/googleAuthServicesInterface";
import { GoogleAuthService } from "@src/frameworks/services/googleAuthService";
const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  studentDbRepository: StudentsDbInterface,
  studentDbRepositoryImpl: StudentRepositoryMongoDB,
  googleAuthServiceInterface:GoogleAuthServiceInterface,
  googleAuthServiceImpl:GoogleAuthService
) => {
  const dbRepositoryUser = studentDbRepository(studentDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl())

  const registerStudent = asyncHandler(async (req: Request, res: Response) => {
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
    res.json(sendJsonResponse("success", "User logged in successfully", token));
  });

  const loginWithGoogle = asyncHandler(async(req:Request,res:Response)=>{
    const {credential}:{credential:string} = req.body
    const token = await signInWithGoogle(credential,googleAuthService,dbRepositoryUser,authService)
    res.json(sendJsonResponse("success","Successfully logged in with google",token))
  })

  return {
    loginStudent,
    registerStudent,
    loginWithGoogle
  };
};

export default authController;
