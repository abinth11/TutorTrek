import Course from '../models/course';
import mongoose from 'mongoose';
import Students from '../models/student';
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
      { $push: { coursesEnrolled: studentId } }
    );
    return response;
  };

  const getRecommendedCourseByStudentInterest = async (studentId: string) => {
    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(studentId) } },
      { $unwind: '$interests' },
      {
        $lookup: {
          from: 'categories',
          localField: 'interests',
          foreignField: 'name',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $lookup: {
          from: 'course',
          localField: 'category._id',
          foreignField: 'categoryId',
          as: 'courses'
        }
      },
      { $unwind: '$courses' },
      {
        $lookup: {
          from: 'instructor',
          localField: 'courses.instructorId',
          foreignField: '_id',
          as: 'instructor'
        }
      },
      {
        $addFields: {
          instructor: { $arrayElemAt: ['$instructor', 0] }
        }
      },
      {
        $project: {
          course: {
            _id: '$courses._id',
            name: '$courses.title',
            thumbnail: '$courses.thumbnail'
          },
          instructor: {
            _id: '$instructor._id',
            firstName: '$instructor.firstName',
            lastName: '$instructor.lastName',
            email: '$instructor.email'
          }
        }
      }
    ];
    const courses = await Students.aggregate(pipeline);
    return courses;
  };

  const getTrendingCourses = async () => {
    const courses = await Course.aggregate([
      {
        $sort: { enrolledCount: -1 }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: 'instructor',
          localField: 'instructorId',
          foreignField: '_id',
          as: 'instructor'
        }
      },
      {
        $project: {
          title: '$title',
          thumbnail: '$thumbnail',
          instructorFirstName: { $arrayElemAt: ['$instructor.firstName', 0] },
          instructorLastName: { $arrayElemAt: ['$instructor.lastName', 0] }
        }
      }
    ]);
    return courses;
  };

  const getCourseByStudent = async (id: string) => {
    const courses = await Course.find({
      coursesEnrolled: {
        $in: [new mongoose.Types.ObjectId('648d8672320950d1ec7454ac')]
      }
    });
    return courses;
  };

  const getTotalNumberOfCourses = async () => {
    const totalCourses = await Course.find().count();
    return totalCourses;
  };

  return {
    addCourse,
    getAllCourse,
    getCourseById,
    getCourseByInstructorId,
    getAmountByCourseId,
    enrollStudent,
    getRecommendedCourseByStudentInterest,
    getTrendingCourses,
    getCourseByStudent,
    getTotalNumberOfCourses
  };
};

export type CourseRepositoryMongoDbInterface = typeof courseRepositoryMongodb;
