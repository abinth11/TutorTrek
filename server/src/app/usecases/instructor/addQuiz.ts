import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { CourseDbRepositoryInterface } from '../../../app/repositories/courseDbRepository';
import { AddQuizInfoInterface } from '../../../types/instructor/courseInterface';

export const addQuizU =async (
  lessonId: string,
  courseId: string,
  quiz: AddQuizInfoInterface,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
    if(!courseId){
        throw new AppError("Please provide a course id",HttpStatusCodes.BAD_REQUEST)
    }
    if(!lessonId){
        throw new AppError("Please provide a lesson id",HttpStatusCodes.BAD_REQUEST)
    }
    if(!quiz){
        throw new AppError("Please provide sufficient data to create a quiz",HttpStatusCodes.BAD_REQUEST)
    }
    await courseDbRepository.addQuiz(courseId,lessonId,quiz)
   
};
