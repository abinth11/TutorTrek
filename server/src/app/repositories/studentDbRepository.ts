import { StudentRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/studentsRepoMongoDb";
import { StudentRegisterInterface } from "@src/types/studentRegisterInterface";

export const studentDbRepository=(repository:ReturnType<StudentRepositoryMongoDB>)=>{
  
  const addStudent = async (student:StudentRegisterInterface) =>await repository.addStudent(student)

  const getStudentByEmail=async(email:string)=>await repository.getStudentByEmail(email)
  
  const getStudent = async(id:string) => await repository.getStudent(id)

  return {
    addStudent,
    getStudentByEmail,
    getStudent
  }
}

export type StudentsDbInterface = typeof studentDbRepository
