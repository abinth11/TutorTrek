import Course from '../models/course';
import Quiz from '../models/quiz';
import {
  AddCourseInfoInterface,
  AddQuizInfoInterface
} from '@src/types/instructor/courseInterface';

export const courseRepositoryMongodb = () => {
  const addCourse = async (courseInfo: AddCourseInfoInterface) => {
    const newCourse = new Course(courseInfo);
    newCourse.price ? (newCourse.isPaid = true) : (newCourse.isPaid = false);
    console.log(newCourse)
    const { _id: courseId } = await newCourse.save();
    console.log(courseId)
    return courseId;
  };
  const addQuiz = async (courseId: string, quiz: AddQuizInfoInterface) => {
    quiz.courseId = courseId.toString();
    const newQuiz = new Quiz(quiz);
    const { _id: quizId } = await newQuiz.save();
    return quizId;
  };
  return {
    addCourse,
    addQuiz
  };
};

export type CourseRepositoryMongoDbInterface = typeof courseRepositoryMongodb;
