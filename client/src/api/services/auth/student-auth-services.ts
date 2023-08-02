import CONFIG_KEYS from "../../../config";
import {
  StudentRegisterData,
  StudentLoginData,
} from "../../types/student/auth-interface";
import authInstanceAxios from "../../middlewares/interceptor";

export const login = async (endpoint: string, data: StudentLoginData) => {
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    data
  );
  return response;
};

export const register = async (
  endpoint: string,
  studentData: StudentRegisterData
) => {
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    studentData
  );
  return response;
};

export const googleLoginStudent = async (
  endpoint: string,
  credential: string
) => {
  const data = {
    credential,
  };
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    data
  );
  return response.data
};
