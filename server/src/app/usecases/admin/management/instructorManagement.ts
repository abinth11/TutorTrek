import { AdminDbInterface } from '../../../repositories/adminDbRepository';
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
