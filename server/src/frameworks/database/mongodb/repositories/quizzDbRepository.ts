import mongoose from 'mongoose';
import Quiz from '../models/quiz';
import { QuizInterface } from '@src/types/quiz';

import { AddQuizInfoInterface, EditQuizInfoInterface } from '@src/types/courseInterface';

export const quizRepositoryMongodb = () => {
  const getQuizByLessonId = async (lessonId: string) => {
    const quiz: QuizInterface | null = await Quiz.findOne({
      lessonId: new mongoose.Types.ObjectId(lessonId)
    });
    return quiz;
  };

  const addQuiz = async (quiz: AddQuizInfoInterface) => {
    const newQuiz = new Quiz(quiz);
    const { _id: quizId } = await newQuiz.save();
    return quizId;
  };

  const editQuiz = async (lessonId: string, quizInfo: EditQuizInfoInterface) => {
    await Quiz.updateOne(
      { lessonId: new mongoose.Types.ObjectId(lessonId) },
      { ...quizInfo }
    );
  };

  return {
    addQuiz,
    editQuiz,
    getQuizByLessonId
  };
};

export type QuizRepositoryMongoDbInterface = typeof quizRepositoryMongodb;
