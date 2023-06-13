import Instructor from "../models/instructor"
import { InstructorInterface } from "@src/types/instructor/instructorInterface"
export const instructorRepoMongoDb = () =>{
    const addInstructor= async (instructor:InstructorInterface)=>{
        return await Instructor.create(instructor)
    }
    const getInstructorByEmail = async (email:string)=>{
        //todo change the interface; separate interface for database value 
        const instructor:InstructorInterface | null = await Instructor.findOne({email})
        return instructor
    }

    return {
        addInstructor,
        getInstructorByEmail
    }
}

export type InstructorRepositoryMongoDb = typeof instructorRepoMongoDb