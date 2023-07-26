import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getAllInstructorRequests,
  acceptInstructorRequest,
  rejectInstructorRequest,
  getAllInstructors,
  blockInstructors,
  unblockInstructors,
  getBlockedInstructors,
  getInstructorByIdUseCase
} from '../../app/usecases/management/instructorManagement';
import { SendEmailService } from '../../frameworks/services/sendEmailService';
import { SendEmailServiceInterface } from '../../app/services/sendEmailServiceInterface';
import { InstructorDbInterface } from '../../app/repositories/instructorDbRepository';
import { InstructorRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { CustomRequest } from '../../types/customRequest';
import { CloudServiceInterface } from '../../app/services/cloudServiceInterface';
import { CloudServiceImpl } from '../../frameworks/services/s3CloudService';
import {
  changePasswordU,
  getStudentsForInstructorsU,
  updateProfileU
} from '../../app/usecases/instructor';
import { AuthServiceInterface } from '../../app/services/authServicesInterface';
import { AuthService } from '../../frameworks/services/authService';
import { CourseRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/courseReposMongoDb';
import { CourseDbRepositoryInterface } from '@src/app/repositories/courseDbRepository';
const instructorController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  instructorDbRepository: InstructorDbInterface,
  instructorDbRepositoryImpl: InstructorRepositoryMongoDb,
  courseDbRepository: CourseDbRepositoryInterface,
  courseDbRepositoryImpl: CourseRepositoryMongoDbInterface,
  emailServiceInterface: SendEmailServiceInterface,
  emailServiceImpl: SendEmailService,
  cloudServiceInterface: CloudServiceInterface,
  cloudServiceImpl: CloudServiceImpl
) => {
  const authService = authServiceInterface(authServiceImpl());
  const dbRepositoryInstructor = instructorDbRepository(
    instructorDbRepositoryImpl()
  );
  const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl());
  const emailService = emailServiceInterface(emailServiceImpl());
  const cloudService = cloudServiceInterface(cloudServiceImpl());

  //? INSTRUCTOR MANAGEMENT
  const getInstructorRequests = asyncHandler(
    async (req: Request, res: Response) => {
      const response = await getAllInstructorRequests(dbRepositoryInstructor);
      res.json({
        status: 'success',
        message: 'Successfully retrieved all instructor requests',
        data: response
      });
    }
  );

  const verifyInstructor = asyncHandler(async (req: Request, res: Response) => {
    const instructorId: string = req.params.instructorId;
    const response = await acceptInstructorRequest(
      instructorId,
      dbRepositoryInstructor,
      emailService
    );
    res.json({
      status: 'success',
      message: 'Successfully accepted instructor request',
      data: response
    });
  });

  const rejectRequest = asyncHandler(async (req: Request, res: Response) => {
    const { instructorId, reason }: { instructorId: string; reason: string } =
      req.body;
    const response = await rejectInstructorRequest(
      instructorId,
      reason,
      dbRepositoryInstructor,
      emailService
    );
    res.json({
      status: 'success',
      message: 'Successfully rejected instructor request',
      data: response
    });
  });

  const getAllInstructor = asyncHandler(async (req: Request, res: Response) => {
    const instructors = await getAllInstructors(
      cloudService,
      dbRepositoryInstructor
    );
    res.json({
      status: 'success',
      message: 'Successfully fetched all instructor information',
      data: instructors
    });
  });

  const blockInstructor = asyncHandler(async (req: Request, res: Response) => {
    const { instructorId, reason }: { instructorId: string; reason: string } =
      req.body;
    const response = await blockInstructors(
      instructorId,
      reason,
      dbRepositoryInstructor
    );
    res.json({
      status: 'success',
      message: 'Successfully blocked the instructor',
      data: response
    });
  });

  const unblockInstructor = asyncHandler(
    async (req: Request, res: Response) => {
      const instructorId: string = req.params.instructorId;
      const response = await unblockInstructors(
        instructorId,
        dbRepositoryInstructor
      );
      res.json({
        status: 'success',
        message: 'Successfully unblocked the instructor',
        data: response
      });
    }
  );

  const getBlockedInstructor = asyncHandler(
    async (req: Request, res: Response) => {
      const response = await getBlockedInstructors(
        cloudService,
        dbRepositoryInstructor
      );
      res.json({
        status: 'success',
        message: 'Successfully fetched blocked instructors',
        data: response
      });
    }
  );

  const getInstructorById = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      let instructorId = req.params.instructorId;
      const response = await getInstructorByIdUseCase(
        instructorId,
        cloudService,
        dbRepositoryInstructor
      );
      res.json({
        status: 'success',
        message: 'Successfully fetched instructor info',
        data: response
      });
    }
  );

  const updateProfile = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const instructorId = req.user?.Id;
      const instructorInfo = req.body;
      const profilePic: Express.Multer.File = req.file as Express.Multer.File;
      await updateProfileU(
        instructorId,
        instructorInfo,
        profilePic,
        cloudService,
        dbRepositoryInstructor
      );
      res.json({
        status: 'success',
        message: 'Successfully updated profile',
        data: null
      });
    }
  );

  const changePassword = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const passwordInfo: { currentPassword: string; newPassword: string } =
        req.body;
      const instructorId: string | undefined = req.user?.Id;
      await changePasswordU(
        instructorId,
        passwordInfo,
        authService,
        dbRepositoryInstructor
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully reset password',
        data: null
      });
    }
  );

  const getStudentsForInstructors = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const instructorId: string | undefined = req.user?.Id;
      const students = await getStudentsForInstructorsU(
        instructorId,
        cloudService,
        dbRepositoryCourse
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved all students',
        data: students
      });
    }
  );

  const getInstructorDetails = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const instructorId = req.user?.Id;
      const instructor = await getInstructorByIdUseCase(
        instructorId ?? '',
        cloudService,
        dbRepositoryInstructor
      );
      res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved instructor details...',
        data: instructor
      });
    }
  );

  return {
    getInstructorRequests,
    verifyInstructor,
    rejectRequest,
    getAllInstructor,
    blockInstructor,
    unblockInstructor,
    getBlockedInstructor,
    getInstructorById,
    updateProfile,
    changePassword,
    getStudentsForInstructors,
    getInstructorDetails
  };
};

export default instructorController;
