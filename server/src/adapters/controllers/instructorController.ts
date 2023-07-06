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
const instructorController = (
  instructorDbRepository: InstructorDbInterface,
  instructorDbRepositoryImpl: InstructorRepositoryMongoDb,
  emailServiceInterface: SendEmailServiceInterface,
  emailServiceImpl: SendEmailService
) => {
  const dbRepositoryInstructor = instructorDbRepository(instructorDbRepositoryImpl());
  const emailService = emailServiceInterface(emailServiceImpl());

  //? INSTRUCTOR MANAGEMENT
  const getInstructorRequests = asyncHandler(
    async (req: Request, res: Response) => {
      const response = await getAllInstructorRequests(dbRepositoryInstructor);
      res.json({
        status: 'success',
        message: 'Successfully retrieved all instructor requests',
        data: response,
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
      data: response,
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
      data: response,
    });
  });

  const getAllInstructor = asyncHandler(async (req: Request, res: Response) => {
    const instructors = await getAllInstructors(dbRepositoryInstructor);
    res.json({
      status: 'success',
      message: 'Successfully fetched all instructor information',
      data: instructors,
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
      data: response,
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
        data: response,
      });
    }
  );

  const getBlockedInstructor = asyncHandler(async(req:Request,res:Response)=>{
    const response = await getBlockedInstructors(dbRepositoryInstructor)
    res.json({
      status:'success',
      message:'Successfully fetched blocked instructors',
      data:response
    })
  })

  const getInstructorById = asyncHandler(async(req:Request,res:Response)=>{
    const instructorId=req?.params?.instructorId
    const response = await getInstructorByIdUseCase(instructorId,dbRepositoryInstructor)
    res.json({
      status:'success',
      message:'Successfully fetched instructor info',
      data:response
    })

  })

  return {
    getInstructorRequests,
    verifyInstructor,
    rejectRequest,
    getAllInstructor,
    blockInstructor,
    unblockInstructor,
    getBlockedInstructor,
    getInstructorById
  };
};

export default instructorController;
