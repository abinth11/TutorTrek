import END_POINTS from "../../../constants/endpoints";
import { getLessonsByCourseService,addLessonsService,getLessonsByIdService } from "../../services/course/lessonService";

export const getLessonsByCourse = (courseId: string) => {
    return getLessonsByCourseService(END_POINTS.GET_LESSONS_BY_COURSE, courseId);
  };
  
  export const addLesson = (courseId: string, lesson: FormData) => {
    return addLessonsService(END_POINTS.ADD_LESSON, courseId, lesson);
  };
  
  export const getLessonById = (lessonId:string)=>{
    return getLessonsByIdService(END_POINTS.GET_LESSONS_BY_ID,lessonId)
  }