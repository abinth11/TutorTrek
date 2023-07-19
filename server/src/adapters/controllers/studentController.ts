import { StudentsDbInterface } from '../../app/repositories/studentDbRepository';
import { StudentRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { AuthService } from '../../frameworks/services/authService';
import { AuthServiceInterface } from '../../app/services/authServicesInterface';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { CustomRequest } from '../../types/customRequest';
import {
  changePasswordU,
  getProfileUrlU,
  getStudentDetailsU,
  updateProfileU
} from '../../app/usecases/student';
import {
  StudentInterface,
  StudentUpdateInfo
} from '../../types/studentInterface';
import { CloudServiceInterface } from '../../app/services/cloudServiceInterface';
import { CloudServiceImpl } from '../../frameworks/services/s3CloudService';

const studentController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  studentDbRepository: StudentsDbInterface,
  studentDbRepositoryImpl: StudentRepositoryMongoDB,
  cloudServiceInterface: CloudServiceInterface,
  cloudServiceImpl: CloudServiceImpl
) => {
  const dbRepositoryStudent = studentDbRepository(studentDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const cloudService = cloudServiceInterface(cloudServiceImpl());

  const changePassword = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const passwordInfo: { currentPassword: string; newPassword: string } =
        req.body;
      const studentId: string | undefined = req.user?.Id;
      await changePasswordU(
        studentId,
        passwordInfo,
        authService,
        dbRepositoryStudent
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully reset password',
        data: null
      });
    }
  );

  const updateProfile = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const studentInfo: StudentUpdateInfo = req.body;
      const studentId: string | undefined = req.user?.Id;
      const profilePic: Express.Multer.File = req.file as Express.Multer.File;
      await updateProfileU(
        studentId,
        studentInfo,
        profilePic,
        cloudService,
        dbRepositoryStudent
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully updated your profile',
        data: null
      });
    }
  );

  const getStudentDetails = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const studentId: string | undefined = req.user?.Id;
      const studentDetails = await getStudentDetailsU(
        studentId,
        dbRepositoryStudent
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved student details',
        data: studentDetails
      });
    }
  );

  const getProfileUrl = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const studentId: string | undefined = req.user?.Id;
      const url = await getProfileUrlU(
        studentId,
        cloudService,
        dbRepositoryStudent
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved image url',
        data: url
      });
    }
  );

  return {
    changePassword,
    updateProfile,
    getStudentDetails,
    getProfileUrl
  };
};

export default studentController;
