import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/interceptors";

export const getAllCoursesService = async (endpoint: string) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response;
};

export const getIndividualCourseService = async (
  endpoint: string,
  courseId: string
) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${courseId}`
  );
  return response;
};
