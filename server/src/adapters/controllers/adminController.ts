import { AdminRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { AdminDbInterface } from '../../app/repositories/adminDbRepository';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { SendEmailService } from '@src/frameworks/services/sendEmailService';
import { SendEmailServiceInterface } from '@src/app/services/sendEmailServiceInterface';
const adminController = (
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDb,
  emailServiceInterface: SendEmailServiceInterface,
  emailServiceImpl: SendEmailService
) => {
  const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
  const emailService = emailServiceInterface(emailServiceImpl());
 

  return {
  };
};

export default adminController;
