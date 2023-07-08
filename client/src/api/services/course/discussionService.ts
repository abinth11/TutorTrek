import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/interceptors";

export const addDiscussionService = async (
  endpoint: string,
  lessonId: string,
  message: string
) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${lessonId}`,
    {
      message,
    }
  );
  return response.data;
};

export const getDiscussionsByLessonService = async (
  endpoint: string,
  lessonId: string
) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${lessonId}`
  );
  return response.data;
};

export const editDiscussionService = async (
  endpoint: string,
  id: string,
  message: string
) => {
  const response = await api.patch(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${id}`,
    {
      message,
    }
  );
  return response.data;
};
