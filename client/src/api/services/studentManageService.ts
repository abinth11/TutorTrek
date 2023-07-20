import CONSTANTS_COMMON from "../../constants/common";
import api from "../middlewares/protectedInterceptor";

export const blockStudentService = async (
  endpoint: string,
  studentId: string,
  reason: string
) => {
  const response = await api.patch(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${studentId}`,
    { reason }
  );
  return response.data;
};

export const unblockStudentService = async (
  endpoint: string,
  studentId: string
) => {
  const response = await api.patch(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${studentId}`
  );
  return response.data;
};

export const getAllStudentsService = async (endpoint: string) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};

export const getAllBlockedStudentsService = async (endpoint: string) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};
