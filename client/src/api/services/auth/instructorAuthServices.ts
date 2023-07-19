import CONSTANTS_COMMON from "../../../constants/common";
import authInstanceAxios from "../../middlewares/authInterceptor";
import {
  InstructorRegisterDataInterface,
  InstructorLoginInfo,
} from "../../types/instructor/authInterface";

export const register = async (
  endpoint: string,
  instructorData: FormData
) => {
  const response = await authInstanceAxios.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    instructorData
  );
  return response;
};

export const login = async (
  endpoint: string,
  loginInfo: InstructorLoginInfo
) => {
  const response = await authInstanceAxios.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    loginInfo
  );
  return response;
};
