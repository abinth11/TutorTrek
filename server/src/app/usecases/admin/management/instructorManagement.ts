import { AdminDbInterface } from '../../../repositories/adminDbRepository';
import HttpStatusCodes from '../../../../constants/HttpStatusCodes';
import AppError from '../../../../utils/appError';
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
  adminRepository: ReturnType<AdminDbInterface>
) => {
  const response = await adminRepository.acceptInstructorRequest(instructorId);
  return response;
};

export const rejectInstructorRequest = async (
  instructorId: string,
  reason: string,
  adminRepository: ReturnType<AdminDbInterface>
) => {
  if (!instructorId || !reason) {
    throw new AppError(
      'InstructorId or reason cannot be empty',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const rejected = await adminRepository.checkRejected(instructorId)
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
  return response;
};
