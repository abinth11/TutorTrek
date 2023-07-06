import Course from '../models/course';
import mongoose from 'mongoose';
import {
  AddCourseInfoInterface,
} from '@src/types/courseInterface';

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

  return {
    addCourse,
    getAllCourse,
    getCourseById,
    getCourseByInstructorId
  };
};

export type CourseRepositoryMongoDbInterface = typeof courseRepositoryMongodb;
