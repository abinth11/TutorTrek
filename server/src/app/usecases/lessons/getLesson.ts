import { CourseDbRepositoryInterface } from "../../../app/repositories/courseDbRepository";
import AppError from "../../../utils/appError";
import HttpStatusCodes from "../../../constants/HttpStatusCodes";

export const getLessonByIdU = async (lessonId:string,courseDbRepository:ReturnType<CourseDbRepositoryInterface>) =>{
    if(!lessonId){
        throw new AppError("Please provide a lesson id",HttpStatusCodes.BAD_REQUEST)
    }
    const lesson = await courseDbRepository.getLessonById(lessonId)
    return lesson

}