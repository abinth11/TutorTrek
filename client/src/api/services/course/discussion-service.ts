import api from "../../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../../config";

export const addDiscussionService = async (
  endpoint: string,
  lessonId: string,
  message: string
) => {
  const response = await api.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${lessonId}`,
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
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${lessonId}`
  );
  return response.data;
};

export const editDiscussionService = async (
  endpoint: string,
  id: string,
  message: string
) => {
  const response = await api.patch(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${id}`,
    {
      message,
    }
  );
  return response.data;
};

export const deleteDiscussionService = async (endpoint: string, id: string) => {
  const response = await api.delete(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${id}`
  );
  return response.data;
};

export const replyDiscussionService = async (
  endpoint: string,
  id: string,
  reply: { studentId: string; message: string }
) => {
  const response = await api.put(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${id}`,
    {
      reply,
    }
  );
  return response.data;
};

export const getRepliesByDiscussionService = async (
  endpoint: string,
  id: string,
) => {
  const response = await api.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${id}`
  );
  return response.data;
};
