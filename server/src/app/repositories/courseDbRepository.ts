import { CourseRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/courseReposMongoDb';
import { AddCourseInfoInterface } from '@src/types/instructor/courseInterface';
import { AddQuizInfoInterface } from '@src/types/instructor/courseInterface';
import { CreateLessonInterface } from '@src/types/instructor/lesson';

export const courseDbRepository = (
  repository: ReturnType<CourseRepositoryMongoDbInterface>
) => {
  const addCourse = async (courseInfo: AddCourseInfoInterface) =>
    await repository.addCourse(courseInfo);
  
  const addQuiz = async (quiz:AddQuizInfoInterface)=>await repository.addQuiz(quiz)

  const getAllCourse = async ()=> await repository.getAllCourse()

  const getCourseById = async (courseId:string) => await repository.getCourseById(courseId)

  const getCourseByInstructorId = async (instructorId:string) => await repository.getCourseByInstructorId(instructorId)

  const addLesson = async (courseId:string,instructorId:string,lesson:CreateLessonInterface)=> await repository.addLesson(courseId,instructorId,lesson)

  const getLessonsByCourseId = async (courseId:string)=> await repository.getLessonsByCourseId(courseId)

  return {
    addCourse,
    addQuiz,
    getAllCourse,
    getCourseById,
    getCourseByInstructorId,
    addLesson,
    getLessonsByCourseId
  };
};
export type CourseDbRepositoryInterface = typeof courseDbRepository;
