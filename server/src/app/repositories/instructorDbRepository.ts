import { InstructorRepositoryMongoDb } from "@src/frameworks/database/mongodb/repositories/instructorRepoMongoDb";
import { InstructorInterface } from "@src/types/instructor/instructorInterface";

export const instructorDbRepository = (repository:ReturnType<InstructorRepositoryMongoDb>)=>{
    const addInstructor = async (instructor:InstructorInterface)=> await repository.addInstructor(instructor)
    const getInstructorByEmail = async (email:string)=>await repository.getInstructorByEmail(email)
    return {
        addInstructor,
        getInstructorByEmail
    }
}

export type InstructorDbInterface = typeof instructorDbRepository