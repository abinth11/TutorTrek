import Course from '../models/course';
import mongoose from 'mongoose';
import { AddCourseInfoInterface } from '@src/types/courseInterface';

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

  const getAmountByCourseId = async (courseId: string) => {
    const amount = await Course.findOne(
      { _id: new mongoose.Types.ObjectId(courseId) },
      { price: 1 }
    );
    return amount;
  };

  const enrollStudent = async (courseId: string, studentId: string) => {
    const response = await Course.updateOne(
      { _id: new mongoose.Types.ObjectId(courseId) },
      { $push: { coursesEnrolled:studentId } }
    );
    return response
  };

  return {
    addCourse,
    getAllCourse,
    getCourseById,
    getCourseByInstructorId,
    getAmountByCourseId,
    enrollStudent
  };
};

export type CourseRepositoryMongoDbInterface = typeof courseRepositoryMongodb;
