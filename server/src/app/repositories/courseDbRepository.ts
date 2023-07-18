import { CourseRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/courseReposMongoDb';
import { AddCourseInfoInterface } from '@src/types/courseInterface';

export const courseDbRepository = (
  repository: ReturnType<CourseRepositoryMongoDbInterface>
) => {
  const addCourse = async (courseInfo: AddCourseInfoInterface) =>
    await repository.addCourse(courseInfo);

  const getAllCourse = async () => await repository.getAllCourse();

  const getCourseById = async (courseId: string) =>
    await repository.getCourseById(courseId);

  const getCourseByInstructorId = async (instructorId: string) =>
    await repository.getCourseByInstructorId(instructorId);

  const getAmountByCourseId = async (courseId: string) =>
    await repository.getAmountByCourseId(courseId);

  const enrollStudent = async (courseId: string, studentId: string) =>
    await repository.enrollStudent(courseId, studentId);

  const getRecommendedCourseByStudentInterest = async (studentId: string) =>
    await repository.getRecommendedCourseByStudentInterest(studentId);

  const getTrendingCourse = async () => await repository.getTrendingCourses();

  const getCourseByStudent = async (studentId:string)=> await repository.getCourseByStudent(studentId)

  return {
    addCourse,
    getAllCourse,
    getCourseById,
    getCourseByInstructorId,
    getAmountByCourseId,
    enrollStudent,
    getRecommendedCourseByStudentInterest,
    getTrendingCourse,
    getCourseByStudent
  };
};
export type CourseDbRepositoryInterface = typeof courseDbRepository;
