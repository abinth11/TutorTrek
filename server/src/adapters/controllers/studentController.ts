import { StudentsDbInterface } from '../../app/repositories/studentDbRepository';
import { StudentRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { AuthService } from '../../frameworks/services/authService';
import { AuthServiceInterface } from '../../app/services/authServicesInterface';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { CustomRequest } from '../../types/customRequest';
import {
  changePasswordU,
  getStudentDetailsU,
  updateProfileU
} from '../../app/usecases/student';
import { StudentUpdateInfo } from '../../types/studentInterface';
import { CloudServiceInterface } from '../../app/services/cloudServiceInterface';
import { CloudServiceImpl } from '../../frameworks/services/s3CloudService';
import {
  blockStudentU,
  getAllBlockedStudentsU,
  getAllStudentsU,
  unblockStudentU
} from '../../app/usecases/management/studentManagement';
import { RedisClient } from '../../app';
import { CacheRepositoryInterface } from '../../app/repositories/cachedRepoInterface';
import { RedisRepositoryImpl } from '../../frameworks/database/redis/redisCacheRepository';
import { addContactU } from '../../app/usecases/contact';
import { ContactInterface } from '../../types/contact';
import { ContactDbInterface } from '../../app/repositories/contactDbRepository';
import { ContactRepoImpl } from '../../frameworks/database/mongodb/repositories/contactsRepoMongoDb';

const studentController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  studentDbRepository: StudentsDbInterface,
  studentDbRepositoryImpl: StudentRepositoryMongoDB,
  contactDbRepository: ContactDbInterface,
  contactDbRepositoryImpl: ContactRepoImpl,
  cloudServiceInterface: CloudServiceInterface,
  cloudServiceImpl: CloudServiceImpl,
  cacheDbRepository: CacheRepositoryInterface,
  cacheDbRepositoryImpl: RedisRepositoryImpl,
  cacheClient: RedisClient
) => {
  const dbRepositoryStudent = studentDbRepository(studentDbRepositoryImpl());
  const dbRepositoryCache = cacheDbRepository(
    cacheDbRepositoryImpl(cacheClient)
  );
  const dbRepositoryContact = contactDbRepository(contactDbRepositoryImpl());

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
      await dbRepositoryCache.clearCache(studentId ?? '');
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
        cloudService,
        dbRepositoryStudent
      );
      const cacheOptions = {
        key: `${studentId}`,
        expireTimeSec: 600,
        data: JSON.stringify(studentDetails)
      };
      await dbRepositoryCache.setCache(cacheOptions);
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved student details',
        data: studentDetails
      });
    }
  );

  const getAllStudents = asyncHandler(async (req: Request, res: Response) => {
    const students = await getAllStudentsU(cloudService, dbRepositoryStudent);
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved all student details',
      data: students
    });
  });

  const blockStudent = asyncHandler(async (req: Request, res: Response) => {
    const studentId: string = req.params.studentId;
    const reason: string = req.body.reason;
    await blockStudentU(studentId, reason, dbRepositoryStudent);
    res.status(200).json({
      status: 'success',
      message: 'Successfully blocked student ',
      data: null
    });
  });

  const unblockStudent = asyncHandler(async (req: Request, res: Response) => {
    const studentId: string = req.params.studentId;
    await unblockStudentU(studentId, dbRepositoryStudent);
    res.status(200).json({
      status: 'success',
      message: 'Successfully unblocked student ',
      data: null
    });
  });

  const getAllBlockedStudents = asyncHandler(
    async (req: Request, res: Response) => {
      const students = await getAllBlockedStudentsU(
        cloudService,
        dbRepositoryStudent
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully unblocked student ',
        data: students
      });
    }
  );

  const addContact = asyncHandler(async (req: Request, res: Response) => {
    const contactInfo: ContactInterface = req.body;
    await addContactU(contactInfo, dbRepositoryContact);
    res.status(200).json({
      status: 'success',
      message: 'Successfully Submitted your response ',
      data: null
    });
  });

  return {
    changePassword,
    updateProfile,
    getStudentDetails,
    blockStudent,
    unblockStudent,
    getAllStudents,
    getAllBlockedStudents,
    addContact
  };
};

export default studentController;
