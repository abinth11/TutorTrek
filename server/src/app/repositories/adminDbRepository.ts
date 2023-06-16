import { AdminRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/adminRepoMongoDb';

export const adminDbRepository = (
  repository: ReturnType<AdminRepositoryMongoDb>
) => {
  const getAdminByEmail = async (email: string) =>
    await repository.getAdminByEmail(email);
  const getInstructorRequests = async () =>
    await repository.getInstructorRequests();
  const acceptInstructorRequest = async (instructorId: string) =>
    await repository.acceptInstructorRequest(instructorId);

  const rejectInstructorRequest = async (
    instructorId: string,
    reason: string
  ) => await repository.rejectInstructorRequest(instructorId, reason);
  return {
    getAdminByEmail,
    getInstructorRequests,
    acceptInstructorRequest,
    rejectInstructorRequest,
  };
};

export type AdminDbInterface = typeof adminDbRepository;
