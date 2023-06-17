import { AdminDbInterface } from '../../../repositories/adminDbRepository';
import HttpStatusCodes from '../../../../constants/HttpStatusCodes';
import AppError from '../../../../utils/appError';
import { SendEmailService } from '@src/frameworks/services/sendEmailService';
export const getAllInstructorRequests = async (
  adminRepository: ReturnType<AdminDbInterface>
) => {
  const allRequests = await adminRepository.getInstructorRequests();
  if (allRequests.length === 0) {
    return null;
  }
  return allRequests;
};

export const acceptInstructorRequest = async (
  instructorId: string,
  adminRepository: ReturnType<AdminDbInterface>,
  emailService: ReturnType<SendEmailService>
) => {
  const response = await adminRepository.acceptInstructorRequest(instructorId);
  // if (response) {
  //   emailService.sendEmail(
  //     response.email,
  //     'Successfully verified your profile',
  //     'You are verified'
  //   );
  // }
  return response;
};

export const rejectInstructorRequest = async (
  instructorId: string,
  reason: string,
  adminRepository: ReturnType<AdminDbInterface>,
  emailService: ReturnType<SendEmailService>
) => {
  if (!instructorId || !reason) {
    throw new AppError(
      'InstructorId or reason cannot be empty',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const rejected = await adminRepository.checkRejected(instructorId);
  if (rejected) {
    throw new AppError(
      'Already rejected this request',
      HttpStatusCodes.CONFLICT
    );
  }
  const response = await adminRepository.rejectInstructorRequest(
    instructorId,
    reason
  );
  if (response) {
    emailService.sendEmail(
      response.email,
      'Sorry your request is rejected',
      reason
    );
  }
  return response;
};
