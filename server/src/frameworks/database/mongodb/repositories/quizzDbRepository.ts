import mongoose from 'mongoose';
import Quiz from '../models/quiz';

export const quizRepositoryMongodb = () => {
  const getQuizByLessonId = async (lessonId: string) => {
    const quiz = await Quiz.findOne({ lessonId:new mongoose.Types.ObjectId(lessonId) });
    return quiz;
  };
  return {
    getQuizByLessonId
  };
};

export type QuizRepositoryMongoDbInterface = typeof quizRepositoryMongodb