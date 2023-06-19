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

  const checkRejected = async (instructorId: string) =>
    await repository.checkRejected(instructorId);
  const rejectInstructorRequest = async (
    instructorId: string,
    reason: string
  ) => await repository.rejectInstructorRequest(instructorId, reason);

  const getAllInstructors = async () => await repository.getAllInstructors();

  const blockInstructors = async (instructorId: string, reason: string) =>
    await repository.blockInstructors(instructorId, reason);

  const unblockInstructors = async (instructorId: string) =>
    await repository.unblockInstructors(instructorId);

  const getBlockedInstructors = async ()=> await repository.getBlockedInstructors()

  const getInstructorById = async (instructorId:string) => await repository.getInstructorById(instructorId)
  
  return {
    getAdminByEmail,
    getInstructorRequests,
    acceptInstructorRequest,
    checkRejected,
    rejectInstructorRequest,
    getAllInstructors,
    blockInstructors,
    unblockInstructors,
    getBlockedInstructors,
    getInstructorById
  };
};

export type AdminDbInterface = typeof adminDbRepository;
