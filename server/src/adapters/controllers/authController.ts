import { Request, Response} from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../app/services/authServicesInterface";
import { StudentsDbInterface } from "../../app/repositories/studentDbRepository";
import { StudentRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/studentsRepoMongoDb";
import {
  studentLogin,
  studentRegister,
  signInWithGoogle,
} from "../../app/usecases/auth/studentAuth";
import {instructorRegister} from "../../../src/app/usecases/auth/instructorAuth"
import { InstructorDbInterface } from "@src/app/repositories/instructorDbRepository";
import { InstructorRepositoryMongoDb } from "@src/frameworks/database/mongodb/repositories/instructorRepoMongoDb";
import { StudentRegisterInterface } from "@src/types/student/studentRegisterInterface";
import {
  sendJsonResponse,
  sendJsonResponseAdminRegister,
} from "../Helpers/generateJsonResponse";
import { GoogleAuthServiceInterface } from "@src/app/services/googleAuthServicesInterface";
import { GoogleAuthService } from "@src/frameworks/services/googleAuthService";
import { InstructorInterface } from "@src/types/instructor/instructorInterface";
const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  studentDbRepository: StudentsDbInterface,
  studentDbRepositoryImpl: StudentRepositoryMongoDB,
  instructorDbRepository: InstructorDbInterface,
  instructorDbRepositoryImpl: InstructorRepositoryMongoDb,
  googleAuthServiceInterface: GoogleAuthServiceInterface,
  googleAuthServiceImpl: GoogleAuthService
) => {
  const dbRepositoryUser = studentDbRepository(studentDbRepositoryImpl());
  const dbRepositoryInstructor = instructorDbRepository(
    instructorDbRepositoryImpl()
  );
  const authService = authServiceInterface(authServiceImpl());
  const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl());

  //? STUDENT
  const registerStudent = asyncHandler(async (req: Request, res: Response) => {
    const student: StudentRegisterInterface = req.body;
    console.log(student)
    const user = req.body
    const token = await studentRegister(student, dbRepositoryUser, authService);
    res.json(
      sendJsonResponse("success", "Successfully registered the user", token)
    );
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

  const loginWithGoogle = asyncHandler(async (req: Request, res: Response) => {
    const { credential }: { credential: string } = req.body;
    const token = await signInWithGoogle(
      credential,
      googleAuthService,
      dbRepositoryUser,
      authService
    );
    res.json(
      sendJsonResponse("success", "Successfully logged in with google", token)
    );
  });

  //? INSTRUCTOR
  const registerInstructor = asyncHandler(
    async (req: Request, res: Response) => {
      const instructor: InstructorInterface = req.body;
      const response = await instructorRegister(
        instructor,
        dbRepositoryInstructor,
        authService
      );
      response.status
        ? res.json(
            sendJsonResponseAdminRegister("Success","Your registration is pending verification by the administrators.You will receive an email once your registration is approved")
          )
        : res.json(sendJsonResponseAdminRegister( "failed","failed to register"));
    }
  );

  return {
    loginStudent,
    registerStudent,
    loginWithGoogle,
    registerInstructor
  };
};

export default authController;
