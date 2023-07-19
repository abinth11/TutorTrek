import { StudentInterface } from '../../../../types/studentInterface';
import Student from '../models/student';
import { StudentRegisterInterface } from '@src/types/studentRegisterInterface';
import { StudentUpdateInfo } from '../../../../types/studentInterface';
import mongoose from 'mongoose';

export const studentRepositoryMongoDB = () => {
  const addStudent = async (student: StudentRegisterInterface) => {
    return await Student.create(student);
  };

  const getStudentByEmail = async (email: string) => {
    const user: StudentInterface | null = await Student.findOne({ email });
    return user;
  };

  const getStudent = async (id: string) => {
    const student: StudentInterface | null = await Student.findById({
      _id: new mongoose.Types.ObjectId(id)
    });
    return student;
  };

  const changePassword = async (id: string, password: string) => {
    await Student.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { password }
    );
  };

  const updateProfile = async (id: string, studentInfo: StudentUpdateInfo) => {
    await Student.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { ...studentInfo }
    );
  };

  return {
    addStudent,
    getStudentByEmail,
    getStudent,
    changePassword,
    updateProfile
  };
};

export type StudentRepositoryMongoDB = typeof studentRepositoryMongoDB;
