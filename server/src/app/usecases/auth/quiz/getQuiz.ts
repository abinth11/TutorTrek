import AppError from '../../../../utils/appError';
import HttpStatusCodes from '../../../../constants/HttpStatusCodes';
import { QuizDbInterface } from '../../../../app/repositories/quizDbRepository';

export const getQuizzesLessonU =async (
  lessonId: string,
  quizDbRepository: ReturnType<QuizDbInterface>
) => {
    if(!lessonId){
        throw new AppError(
            'Lesson id not found',
            HttpStatusCodes.BAD_REQUEST
          );
    }
    const quizzes = await quizDbRepository.getQuizByLessonId(lessonId)
    return quizzes
};
