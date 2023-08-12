import { StudentInterface } from '../../../../types/studentInterface';
import Student from '../models/student';
import { StudentRegisterInterface } from '@src/types/studentRegisterInterface';
import { StudentUpdateInfo } from '../../../../types/studentInterface';
import mongoose from 'mongoose';

export const studentRepositoryMongoDB = () => {
  const addStudent = async (student: StudentRegisterInterface) => {
    const newStudent = new Student(student);
    return await newStudent.save();
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

  const getAllStudents = async () => {
    const students: StudentInterface[] | null = await Student.find({});
    return students;
  };

  const blockStudent = async (id: string, reason: string) => {
    await Student.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { isBlocked: true, blockedReason: reason }
    );
  };

  const unblockStudent = async (id: string) => {
    await Student.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { isBlocked: false, blockedReason: '' }
    );
  };

  const getAllBlockedStudents = async () => {
    const blockedStudents: StudentInterface[] | null = await Student.find({
      isBlocked: true
    });
    return blockedStudents;
  };

  const getTotalNumberOfStudents = async () => {
    const total = await Student.find().count();
    return total;
  };

  return {
    addStudent,
    getStudentByEmail,
    getStudent,
    changePassword,
    updateProfile,
    getAllStudents,
    blockStudent,
    unblockStudent,
    getAllBlockedStudents,
    getTotalNumberOfStudents
  };
};

export type StudentRepositoryMongoDB = typeof studentRepositoryMongoDB;
