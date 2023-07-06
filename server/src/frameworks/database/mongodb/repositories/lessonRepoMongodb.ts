import mongoose from "mongoose";
import Lessons from "../models/lessons";
import { CreateLessonInterface } from '../../../../types/lesson';

export const lessonRepositoryMongodb = ()=>{
    const addLesson = async (
        courseId: string,
        instructorId: string,
        lesson: CreateLessonInterface
      ) => {
        lesson.courseId = courseId;
        lesson.instructorId = instructorId;
        const newLesson = new Lessons(lesson);
        const { _id } = await newLesson.save();
        return _id;
      };
    
      const getLessonsByCourseId = async (courseId: string) => {
        const lessons = await Lessons.find({
          courseId: new mongoose.Types.ObjectId(courseId)
        });
        return lessons;
      };
    
      const getLessonById = async (lessonId:string)=>{
        const lesson = await Lessons.findOne({_id: new mongoose.Types.ObjectId(lessonId)})
        return lesson
      }
      
      return {
        addLesson,
        getLessonsByCourseId,
        getLessonById
      }
}

export type LessonRepositoryMongoDbInterface = typeof lessonRepositoryMongodb