import mongoose from 'mongoose';
import Quiz from '../models/quiz';
import { AddQuizInfoInterface } from '@src/types/courseInterface';

export const quizRepositoryMongodb = () => {

  const getQuizByLessonId = async (lessonId: string) => {
    const quiz = await Quiz.findOne({
      lessonId: new mongoose.Types.ObjectId(lessonId)
    });
    return quiz;
  };

  const addQuiz = async (quiz: AddQuizInfoInterface) => {
    const newQuiz = new Quiz(quiz);
    const { _id: quizId } = await newQuiz.save();
    return quizId;
  };

  return {
    addQuiz,
    getQuizByLessonId
  };
};

export type QuizRepositoryMongoDbInterface = typeof quizRepositoryMongodb;
