import CONFIG_KEYS from "../../config";
import api from "../middlewares/protected-interceptor";

export const blockStudentService = async (
  endpoint: string,
  studentId: string,
  reason: string
) => {
  const response = await api.patch(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${studentId}`,
    { reason }
  );
  return response.data;
};

export const unblockStudentService = async (
  endpoint: string,
  studentId: string
) => {
  const response = await api.patch(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${studentId}`
  );
  return response.data;
};

export const getAllStudentsService = async (endpoint: string) => {
  const response = await api.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};

export const getAllBlockedStudentsService = async (endpoint: string) => {
  const response = await api.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};
