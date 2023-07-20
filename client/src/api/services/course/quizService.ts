import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/protectedInterceptor";

export const getCloudFrontVideoUrlService = async (endpoint:string,key:string)=>{
    const response = await api.get(
      `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${key}`
    );
    return response.data;
  }
  
  export const getQuizzesByLessonService = async(endpoint:string,lessonId:string)=>{
    const response = await api.get(
      `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${lessonId}`
    );
    return response.data;
  }