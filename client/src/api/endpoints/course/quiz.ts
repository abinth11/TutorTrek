import END_POINTS from "../../../constants/endpoints"
import { getCloudFrontVideoUrlService,getQuizzesByLessonService } from "../../services/course/quiz-service"

export const getCloudFrontUrl = (key:string)=>{
    return getCloudFrontVideoUrlService(END_POINTS.STREAM_VIDEO,key)
  }
  
  export const getQuizzesByLesson = (lessonId:string)=>{
    return getQuizzesByLessonService(END_POINTS.GET_QUIZZES_BY_LESSON,lessonId)
  }
  