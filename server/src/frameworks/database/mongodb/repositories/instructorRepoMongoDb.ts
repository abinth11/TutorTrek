import Instructor from "../models/instructor"
import { InstructorInterface, SavedInstructorInterface } from "@src/types/instructor/instructorInterface"
export const instructorRepoMongoDb = () =>{
    const addInstructor= async (instructor:InstructorInterface)=>{
        
        return await Instructor.create(instructor)
    }
    const getInstructorByEmail = async (email:string)=>{
        const instructor:SavedInstructorInterface | null = await Instructor.findOne({email})
        return instructor
    }

    return {
        addInstructor,
        getInstructorByEmail
    }
}

export type InstructorRepositoryMongoDb = typeof instructorRepoMongoDb