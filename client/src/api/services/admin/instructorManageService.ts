import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/interceptors";
export const getInstructors = async (endpoint: string) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response;
};

export const acceptRequest = async (endpoint: string, instructorId: string) => {
  const response = await api.patch(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${instructorId}`
  );
  return response;
};

export const rejectRequest = async (
  endpoint: string,
  instructorId: string,
  reason: string
) => {
  const response = await api.put(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    {
      instructorId,
      reason,
    }
  );
  return response;
};

export const getAllInstructor = async (endpoint: string) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response;
};

export const blockInstructor = async (
  endpoint: string,
  instructorId: string,
  reason: string
) => {
  const response = await api.patch(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    {
      instructorId,
      reason,
    }
  );
  return response;
};

export const unblockInstructor = async (
  endpoint: string,
  instructorId: string
) => {
  const response = await api.patch(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${instructorId}`
  );
  return response;
};

export const getBlockedInstructor = async (endpoint: string) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response;
};

export const getIndividualInstructor = async (endpoint:string,instructorId:string)=>{
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${instructorId}`
  );
  return response;
}
