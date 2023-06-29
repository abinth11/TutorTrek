import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/interceptors";
import {
  InstructorRegisterDataInterface,
  InstructorLoginInfo,
} from "../../types/instructor/authInterface";

export const register = async (
  endpoint: string,
  instructorData: FormData
) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    instructorData
  );
  return response;
};

export const login = async (
  endpoint: string,
  loginInfo: InstructorLoginInfo
) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    loginInfo
  );
  return response;
};
