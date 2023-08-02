import END_POINTS from "../../../constants/endpoints";
import { getLessonsByCourseService,addLessonsService,getLessonsByIdService, editLessonsService } from "../../services/course/lesson-service";

export const getLessonsByCourse = (courseId: string) => {
    return getLessonsByCourseService(END_POINTS.GET_LESSONS_BY_COURSE, courseId);
  };
  
  export const addLesson = (courseId: string, lesson: FormData) => {
    return addLessonsService(END_POINTS.ADD_LESSON, courseId, lesson);
  };

  export const editLesson = (lessonId: string, lesson: FormData) => {
    return editLessonsService(END_POINTS.EDIT_LESSON, lessonId, lesson);
  };
  
  export const getLessonById = (lessonId:string)=>{
    return getLessonsByIdService(END_POINTS.GET_LESSONS_BY_ID,lessonId)
  }