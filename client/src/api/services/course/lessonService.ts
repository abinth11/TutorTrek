import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/interceptors";

export const getLessonsByCourseService = async (
    endpoint: string,
    courseId: string
  ) => {
    const response = await api.get(
      `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${courseId}`
    );
    return response.data;
  };
  
  export const addLessonsService = async (
    endpoint: string,
    courseId: string,
    lesson: FormData
  ) => {
    const response = await api.post(
      `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${courseId}`,
      lesson
    );
    return response.data;
  };
  
  export const getLessonsByIdService = async (
    endpoint: string,
    lessonId: string
  ) => {
    const response = await api.get(
      `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${lessonId}`
    );
    return response.data;
  };