import AppError from '../../../utils/appError';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { QuizDbInterface } from '../../repositories/quizDbRepository';
import { shuffleQuiz } from '../../../app/helper/shuffle';
import { QuizInterface } from '../../../types/quiz';

export const getQuizzesLessonU = async (
  lessonId: string,
  quizDbRepository: ReturnType<QuizDbInterface>
) => {
  if (!lessonId) {
    throw new AppError('Lesson id not found', HttpStatusCodes.BAD_REQUEST);
  }
  const quizzes: QuizInterface | null =
    await quizDbRepository.getQuizByLessonId(lessonId);
    
  return shuffleQuiz(quizzes);
};
