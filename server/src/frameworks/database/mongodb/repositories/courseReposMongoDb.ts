import Course from '../models/course';
import mongoose from 'mongoose';
import Lessons from '../models/lessons';
import {
  AddCourseInfoInterface,
} from '@src/types/courseInterface';
import { CreateLessonInterface } from '@src/types/lesson';

export const courseRepositoryMongodb = () => {
  const addCourse = async (courseInfo: AddCourseInfoInterface) => {
    const newCourse = new Course(courseInfo);
    newCourse.price ? (newCourse.isPaid = true) : (newCourse.isPaid = false);
    const { _id: courseId } = await newCourse.save();
    return courseId;
  };
 
  const getAllCourse = async () => {
    const courses = await Course.find({});
    return courses;
  };

  const getCourseById = async (courseId: string) => {
    const course = await Course.findOne({
      _id: new mongoose.Types.ObjectId(courseId)
    });
    return course;
  };

  const getCourseByInstructorId = async (instructorId: string) => {
    const courses = await Course.find({
      instructorId: new mongoose.Types.ObjectId(instructorId)
    });
    return courses;
  };

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
    addCourse,
    getAllCourse,
    getCourseById,
    getCourseByInstructorId,
    addLesson,
    getLessonsByCourseId,
    getLessonById
  };
};

export type CourseRepositoryMongoDbInterface = typeof courseRepositoryMongodb;
