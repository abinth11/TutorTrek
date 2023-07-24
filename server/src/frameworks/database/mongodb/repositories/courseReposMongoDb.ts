import Course from '../models/course';
import mongoose from 'mongoose';
import Students from '../models/student';
import {
  AddCourseInfoInterface,
  EditCourseInfo,
  CourseInterface
} from '@src/types/courseInterface';

export const courseRepositoryMongodb = () => {
  const addCourse = async (courseInfo: AddCourseInfoInterface) => {
    const newCourse = new Course(courseInfo);
    newCourse.price ? (newCourse.isPaid = true) : (newCourse.isPaid = false);
    const { _id: courseId } = await newCourse.save();
    return courseId;
  };

  const editCourse = async (courseId: string, editInfo: EditCourseInfo) => {
    const response = await Course.updateOne(
      { _id: new mongoose.Types.ObjectId(courseId) },
      { ...editInfo }
    );
  };

  const getAllCourse = async () => {
    const courses:CourseInterface[]|null = await Course.find({});
    return courses;
  };

  const getCourseById = async (courseId: string) => {
    const course:CourseInterface|null = await Course.findOne({
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
          coursesEnrolled: '$coursesEnrolled',
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

  const getNumberOfCoursesAddedInEachMonth = async () => {
    const courseCountsByMonth = await Course.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          month: '$_id',
          count: 1,
          _id: 0
        }
      },
      {
        $sort: {
          month: 1
        }
      }
    ]);
    return courseCountsByMonth;
  };

  const getStudentsByCourseForInstructor = async (instructorId: string) => {
    const students = await Course.aggregate([
      {
        $match: { instructorId: new mongoose.Types.ObjectId(instructorId) }
      },
      {
        $unwind: '$coursesEnrolled'
      },
      {
        $lookup: {
          from: 'students',
          localField: 'coursesEnrolled',
          foreignField: '_id',
          as: 'studentDetails'
        }
      },
      {
        $project: {
          student: { $arrayElemAt: ['$studentDetails', 0] },
          courseName: '$title'
        }
      },
      {
        $project: {
          course: '$courseName',
          firstName: '$student.firstName',
          lastName: '$student.lastName',
          email: '$student.email',
          mobile: '$student.mobile',
          dateJoined: '$student.dateJoined',
          isBlocked: '$student.isBlocked',
          profilePic: '$student.profilePic'
        }
      }
    ]);
    return students;
  };

  return {
    addCourse,
    editCourse,
    getAllCourse,
    getCourseById,
    getCourseByInstructorId,
    getAmountByCourseId,
    enrollStudent,
    getRecommendedCourseByStudentInterest,
    getTrendingCourses,
    getCourseByStudent,
    getTotalNumberOfCourses,
    getNumberOfCoursesAddedInEachMonth,
    getStudentsByCourseForInstructor
  };
};

export type CourseRepositoryMongoDbInterface = typeof courseRepositoryMongodb;
