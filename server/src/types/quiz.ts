import { ObjectId } from "mongoose";
export interface QuizInterface {
    _id: ObjectId;
    courseId: ObjectId;
    lessonId: ObjectId;
    questions: Question[];
    createdAt: Date;
    __v: number;
  }
  
  interface Question {
    question: string;
    options: Option[];
    _id: ObjectId;
  }
  
  interface Option {
    option: string;
    isCorrect: boolean;
    _id: ObjectId;
  }