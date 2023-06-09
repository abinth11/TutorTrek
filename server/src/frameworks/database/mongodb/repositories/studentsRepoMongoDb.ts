import { StudentInterface } from "../../../../types/student/studentInterface";
import Student from "../models/student";
import { StudentRegisterInterface } from "@src/types/student/studentRegisterInterface";

export const studentRepositoryMongoDB = () => {
  const addStudent = async (student:StudentRegisterInterface) => {
    return await Student.create(student);
  };

  const getStudentByEmail = async (email: string) => {
    const user: StudentInterface | null = await Student.findOne({ email });
    return user;
  };

  const getStudent = async (id: string) => await Student.findById(id);

  return {
    addStudent,
    getStudentByEmail,
    getStudent,
  };
};

export type StudentRepositoryMongoDB = typeof studentRepositoryMongoDB;
