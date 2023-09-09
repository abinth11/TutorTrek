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
} from '../../app/usecases/auth/instructorAuth';
import { InstructorDbInterface } from '@src/app/repositories/instructorDbRepository';
import { InstructorRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { StudentRegisterInterface } from '@src/types/studentRegisterInterface';
import { GoogleAuthServiceInterface } from '@src/app/services/googleAuthServicesInterface';
import { GoogleAuthService } from '@src/frameworks/services/googleAuthService';
import { InstructorInterface } from '@src/types/instructorInterface';
import { adminLogin } from '../../app/usecases/auth/adminAuth';
import { AdminDbInterface } from '@src/app/repositories/adminDbRepository';
import { AdminRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { RefreshTokenDbInterface } from '@src/app/repositories/refreshTokenDBRepository';
import { RefreshTokenRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { CloudServiceImpl } from '@src/frameworks/services/s3CloudService';
import { CloudServiceInterface } from '@src/app/services/cloudServiceInterface';
const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  cloudServiceInterface:CloudServiceInterface,
  CloudServiceImpl:CloudServiceImpl,
  studentDbRepository: StudentsDbInterface,
  studentDbRepositoryImpl: StudentRepositoryMongoDB,
  instructorDbRepository: InstructorDbInterface,
  instructorDbRepositoryImpl: InstructorRepositoryMongoDb,
  googleAuthServiceInterface: GoogleAuthServiceInterface,
  googleAuthServiceImpl: GoogleAuthService,
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDb,
  refreshTokenDbRepository: RefreshTokenDbInterface,
  refreshTokenDbRepositoryImpl: RefreshTokenRepositoryMongoDb
) => {
  const dbRepositoryUser = studentDbRepository(studentDbRepositoryImpl());
  const dbRepositoryInstructor = instructorDbRepository(
    instructorDbRepositoryImpl()
  );
  const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
  const dbRepositoryRefreshToken = refreshTokenDbRepository(
    refreshTokenDbRepositoryImpl()
  );
  const authService = authServiceInterface(authServiceImpl());
  const cloudService = cloudServiceInterface(CloudServiceImpl())
  const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl());

  //? STUDENT
  const registerStudent = asyncHandler(async (req: Request, res: Response) => {
    const student: StudentRegisterInterface = req.body;
    const { accessToken, refreshToken } = await studentRegister(
      student,
      dbRepositoryUser,
      dbRepositoryRefreshToken,
      authService
    );
    res.status(200).json({
      status: 'success',
      message: 'Successfully registered the user',
      accessToken,
      refreshToken
    });
  });

  const loginStudent = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const { accessToken, refreshToken } = await studentLogin(
      email,
      password,
      dbRepositoryUser,
      dbRepositoryRefreshToken,
      authService
    );
    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      accessToken,
      refreshToken
    });
  });

  const loginWithGoogle = asyncHandler(async (req: Request, res: Response) => {
    const { credential }: { credential: string } = req.body;
    const { accessToken, refreshToken } = await signInWithGoogle(
      credential,
      googleAuthService,
      dbRepositoryUser,
      dbRepositoryRefreshToken,
      authService
    );
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in with google',
      accessToken,
      refreshToken
    });
  }); 

  //? INSTRUCTOR
  const registerInstructor = asyncHandler(
    async (req: Request, res: Response) => {
      const files: Express.Multer.File[] = req.files as Express.Multer.File[];
      const instructor: InstructorInterface = req.body;
      await instructorRegister(
        instructor,
        files,
        dbRepositoryInstructor,
        authService,
        cloudService
      );
      res.status(200).json({
        status: 'success',
        message:
          'Your registration is pending verification by the administrators.You will receive an email once your registration is approved'
      });
    }
  );
  const loginInstructor = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const { accessToken, refreshToken } = await instructorLogin(
      email,
      password,
      dbRepositoryInstructor,
      dbRepositoryRefreshToken,
      authService
    );
    res.status(200).json({
      status: 'success',
      message: 'Instructor logged in successfully',
      accessToken,
      refreshToken
    });
  });

  //? ADMIN
  const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const { accessToken, refreshToken } = await adminLogin(
      email,
      password,
      dbRepositoryAdmin,
      dbRepositoryRefreshToken,
      authService
    );
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in ',
      accessToken,
      refreshToken
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
