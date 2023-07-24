import CONSTANTS_COMMON from "../../constants/common";
import api from "../middlewares/protectedInterceptor";
import { PasswordInfo } from "../types/student/student";

export const changePasswordService = async (
  endpoint: string,
  passwordInfo: PasswordInfo
) => {
  const response = await api.patch(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    passwordInfo
  );
  return response;
};

export const updateProfileService = async (
  endpoint: string,
  profileInfo: FormData
) => {
  const response = await api.put(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    profileInfo
  );
  return response;
};

export const getMyStudentsService = async (endpoint: string) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};

export const getInstructorDetailsService = async(endpoint:string)=>{
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data;
}