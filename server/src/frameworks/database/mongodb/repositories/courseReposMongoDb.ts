import Course from '../models/course';
import Quiz from '../models/quiz';
import { AddCourseInfoInterface } from '@src/types/instructor/courseInterface';

export const courseRepositoryMongodb = () => {
  const addCourse = async (courseInfo: AddCourseInfoInterface) => {
    console.log(courseInfo)
    const quiz = courseInfo.quiz;
    const newCourse = new Course(courseInfo);
    const { _id: courseId } = await newCourse.save();
    quiz.courseId = courseId.toString();
    const newQuiz = new Quiz(quiz);
    const { _id: quizId } = await newQuiz.save();
    return { insertedCourseId: courseId, insertedQuizId: quizId };
  };
  return {
    addCourse
  };
};

export type CourseRepositoryMongoDbInterface = typeof courseRepositoryMongodb;
