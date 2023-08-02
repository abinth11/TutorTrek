import api from "../../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../../config";

export const getCloudFrontVideoUrlService = async (endpoint:string,key:string)=>{
    const response = await api.get(
      `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${key}`
    );
    return response.data;
  }
  
  export const getQuizzesByLessonService = async(endpoint:string,lessonId:string)=>{
    const response = await api.get(
      `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${lessonId}`
    );
    return response.data;
  }