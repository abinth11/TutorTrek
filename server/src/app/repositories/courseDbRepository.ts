import { CourseRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/courseReposMongoDb';
import {
  AddCourseInfoInterface,
  EditCourseInfo
} from '@src/types/courseInterface';

export const courseDbRepository = (
  repository: ReturnType<CourseRepositoryMongoDbInterface>
) => {
  const addCourse = async (courseInfo: AddCourseInfoInterface) =>
    await repository.addCourse(courseInfo);

  const editCourse = async (courseId: string, editInfo: EditCourseInfo) =>
    await repository.editCourse(courseId, editInfo);

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

  const getCourseByStudent = async (studentId: string) =>
    await repository.getCourseByStudent(studentId);

  const getTotalNumberOfCourses = async () =>
    await repository.getTotalNumberOfCourses();

  const getNumberOfCoursesAddedInEachMonth = async () =>
    await repository.getNumberOfCoursesAddedInEachMonth();

  const getStudentsByCourseForInstructor = async (instructorId: string) =>
    await repository.getStudentsByCourseForInstructor(instructorId);

  const searchCourse = async (isFree: boolean, searchQuery: string,filterQuery:string) =>
    await repository.searchCourse(isFree, searchQuery,filterQuery);

  return {
    addCourse,
    editCourse,
    getAllCourse,
    getCourseById,
    getCourseByInstructorId,
    getAmountByCourseId,
    enrollStudent,
    getRecommendedCourseByStudentInterest,
    getTrendingCourse,
    getCourseByStudent,
    getTotalNumberOfCourses,
    getNumberOfCoursesAddedInEachMonth,
    getStudentsByCourseForInstructor,
    searchCourse
  };
};
export type CourseDbRepositoryInterface = typeof courseDbRepository;
