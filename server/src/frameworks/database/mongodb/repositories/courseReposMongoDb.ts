import Course from '../models/course';
import Quiz from '../models/quiz';
import mongoose from 'mongoose';
import Lessons from '../models/lessons';
import {
  AddCourseInfoInterface,
  AddQuizInfoInterface
} from '@src/types/instructor/courseInterface';
import { CreateLessonInterface } from '@src/types/instructor/lesson';

export const courseRepositoryMongodb = () => {
  const addCourse = async (courseInfo: AddCourseInfoInterface) => {
    const newCourse = new Course(courseInfo);
    newCourse.price ? (newCourse.isPaid = true) : (newCourse.isPaid = false);
    const { _id: courseId } = await newCourse.save();
    return courseId;
  };
  const addQuiz = async (courseId: string, quiz: AddQuizInfoInterface) => {
    quiz.courseId = courseId.toString();
    const newQuiz = new Quiz(quiz);
    const { _id: quizId } = await newQuiz.save();
    return quizId;
  };
  const getAllCourse = async () =>{
    const courses = await Course.find({})
    return courses
  }

  const getCourseById = async (courseId:string)=>{
    const course = await Course.findOne({_id:new mongoose.Types.ObjectId(courseId)})
    return course
  }

  const getCourseByInstructorId = async (instructorId:string)=>{
    const courses = await Course.find({instructorId: new mongoose.Types.ObjectId(instructorId)})
    return courses
  }

  const addLesson = async (courseId:string,instructorId:string,lesson:CreateLessonInterface)=>{
    lesson.courseId=courseId
    lesson.instructorId=instructorId
    const newLesson = new Lessons(lesson)
    await newLesson.save()
  }


  return {
    addCourse,
    addQuiz,
    getAllCourse,
    getCourseById,
    getCourseByInstructorId,
    addLesson
  };
};

export type CourseRepositoryMongoDbInterface = typeof courseRepositoryMongodb;
