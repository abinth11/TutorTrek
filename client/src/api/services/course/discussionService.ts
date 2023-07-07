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
