import Course from '../models/course';
import { AddCourseInfoInterface } from '@src/types/instructor/courseInterface';

export const courseRepositoryMongodb = () => {
  const addCourse = async (courseInfo: AddCourseInfoInterface) => {
    const newCourse = new Course(courseInfo);
    const { _id: insertedId } = await newCourse.save();
    return insertedId;
  };
  return {
    addCourse
  };
};

export type CourseRepositoryMongoDbInterface = typeof courseRepositoryMongodb;
