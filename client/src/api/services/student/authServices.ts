import CONSTANTS_COMMON from "../../../constants/common";
import {
  StudentRegisterData,
  StudentLoginData,
} from "../../types/student/authInterface";
import api from "../../middlewares/interceptors";

export const login = async (endpoint: string, data: StudentLoginData) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    data
  );
  return response;
};

export const register = async (
  endpoint: string,
  studentData: StudentRegisterData
) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
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
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    data
  );
  return response;
};
