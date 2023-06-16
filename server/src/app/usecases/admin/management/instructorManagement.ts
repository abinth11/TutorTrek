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
