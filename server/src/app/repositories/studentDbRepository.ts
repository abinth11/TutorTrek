import { StudentRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/studentsRepoMongoDb";

export const studentDbRepository=(repository:ReturnType<StudentRepositoryMongoDB>)=>{

  const getStudentByEmail=async(email:string)=>await repository.getStudentByEmail(email)
  
  const getStudent = async(id:string) => await repository.getStudent(id)

  return {
    getStudentByEmail,
    getStudent
  }
}

export type StudentsDbInterface = typeof studentDbRepository
