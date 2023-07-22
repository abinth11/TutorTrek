import { InstructorRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { InstructorInterface } from '@src/types/instructorInterface';
import { SavedInstructorInterface } from '@src/types/instructorInterface';

export const instructorDbRepository = (
  repository: ReturnType<InstructorRepositoryMongoDb>
) => {
  const addInstructor = async (instructor: InstructorInterface) =>
    await repository.addInstructor(instructor);

  const getInstructorByEmail = async (email: string) =>
    await repository.getInstructorByEmail(email);

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

  const getBlockedInstructors = async () =>
    await repository.getBlockedInstructors();

  const getInstructorById = async (instructorId: string) =>
    await repository.getInstructorById(instructorId);

  const getTotalNumberOfInstructors = async ()=> await repository.getTotalNumberOfInstructors()

  const changePassword = async (id:string,password:string)=> await repository.changePassword(id,password)

  const updateProfile = async (id:string,instructorInfo:SavedInstructorInterface)=> await repository.updateProfile(id,instructorInfo)

  return {
    addInstructor,
    getInstructorByEmail,
    getInstructorRequests,
    acceptInstructorRequest,
    checkRejected,
    rejectInstructorRequest,
    getAllInstructors,
    blockInstructors,
    unblockInstructors,
    getBlockedInstructors,
    getInstructorById,
    getTotalNumberOfInstructors,
    changePassword,
    updateProfile
  };
};

export type InstructorDbInterface = typeof instructorDbRepository;
