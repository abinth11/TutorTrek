import { StudentRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { StudentRegisterInterface } from '@src/types/studentRegisterInterface';
import { StudentUpdateInfo } from '@src/types/studentInterface';

export const studentDbRepository = (
  repository: ReturnType<StudentRepositoryMongoDB>
) => {
  const addStudent = async (student: StudentRegisterInterface) =>
    await repository.addStudent(student);

  const getStudentByEmail = async (email: string) =>
    await repository.getStudentByEmail(email);

  const getStudent = async (id: string) => await repository.getStudent(id);

  const changePassword = async (id: string, password: string) =>
    await repository.changePassword(id, password);

  const updateProfile = async (id: string, studentInfo: StudentUpdateInfo) =>
    await repository.updateProfile(id, studentInfo);

  return {
    addStudent,
    getStudentByEmail,
    getStudent,
    changePassword,
    updateProfile
  };
};

export type StudentsDbInterface = typeof studentDbRepository;
