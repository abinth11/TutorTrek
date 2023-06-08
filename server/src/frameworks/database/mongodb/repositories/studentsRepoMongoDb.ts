import { StudentInterface } from "../../../../types/student/studentInterface";
import Student from "../models/student";

export const studentRepositoryMongoDB = () => {
  const getStudentByEmail = async (email: string) => {
    const user: StudentInterface | null = await Student.findOne({ email });
    return user;
  };

  const getStudent = async (id: string) =>
   await Student.findById(id)


  return {
    getStudentByEmail,
    getStudent
  };
};

export type StudentRepositoryMongoDB = typeof studentRepositoryMongoDB;
