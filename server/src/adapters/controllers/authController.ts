import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthService } from '../../frameworks/services/authService';
import { AuthServiceInterface } from '../../app/services/authServicesInterface';
import { StudentsDbInterface } from '../../app/repositories/studentDbRepository';
import { StudentRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import {
  studentLogin,
  studentRegister,
  signInWithGoogle
} from '../../app/usecases/auth/studentAuth';
import {
  instructorRegister,
  instructorLogin
} from '../../../src/app/usecases/auth/instructorAuth';
import { InstructorDbInterface } from '@src/app/repositories/instructorDbRepository';
import { InstructorRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { StudentRegisterInterface } from '@src/types/student/studentRegisterInterface';
import { GoogleAuthServiceInterface } from '@src/app/services/googleAuthServicesInterface';
import { GoogleAuthService } from '@src/frameworks/services/googleAuthService';
import { InstructorInterface } from '@src/types/instructor/instructorInterface';
import { adminLogin } from '../../../src/app/usecases/auth/adminAuth';
import { AdminDbInterface } from '@src/app/repositories/adminDbRepository';
import { AdminRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/adminRepoMongoDb';
const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  studentDbRepository: StudentsDbInterface,
  studentDbRepositoryImpl: StudentRepositoryMongoDB,
  instructorDbRepository: InstructorDbInterface,
  instructorDbRepositoryImpl: InstructorRepositoryMongoDb,
  googleAuthServiceInterface: GoogleAuthServiceInterface,
  googleAuthServiceImpl: GoogleAuthService,
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDb
) => {
  const dbRepositoryUser = studentDbRepository(studentDbRepositoryImpl());
  const dbRepositoryInstructor = instructorDbRepository(
    instructorDbRepositoryImpl()
  );
  const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl());

  //? STUDENT
  const registerStudent = asyncHandler(async (req: Request, res: Response) => {
    const student: StudentRegisterInterface = req.body;
    const token = await studentRegister(student, dbRepositoryUser, authService);
    res.status(200).json({
      status: 'success',
      message: 'Successfully registered the user',
      accessToken: token
    });
  });

  const loginStudent = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const token = await studentLogin(
      email,
      password,
      dbRepositoryUser,
      authService
    );
    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      accessToken: token
    });
  });

  const loginWithGoogle = asyncHandler(async (req: Request, res: Response) => {
    const { credential }: { credential: string } = req.body;
    const token = await signInWithGoogle(
      credential,
      googleAuthService,
      dbRepositoryUser,
      authService
    );
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in with google',
      accessToken: token
    });
  });

  //? INSTRUCTOR
  const registerInstructor = asyncHandler(
    async (req: Request, res: Response) => {
      const instructor: InstructorInterface = req.body;
      await instructorRegister(instructor, dbRepositoryInstructor, authService);
      res.status(200).json({
        status: 'success',
        message:
          'Your registration is pending verification by the administrators.You will receive an email once your registration is approved'
      });
    }
  );
  const loginInstructor = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const token = await instructorLogin(
      email,
      password,
      dbRepositoryInstructor,
      authService
    );
    res.status(200).json({
      status: 'success',
      message: 'Instructor logged in successfully',
      accessToken: token
    });
  });

  //? ADMIN
  const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const accessToken = await adminLogin(
      email,
      password,
      dbRepositoryAdmin,
      authService
    );
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in ',
      accessToken
    });
  });

  return {
    loginStudent,
    registerStudent,
    loginWithGoogle,
    registerInstructor,
    loginInstructor,
    loginAdmin
  };
};

export default authController;
