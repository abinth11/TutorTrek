import CONSTANTS_COMMON from "../../constants/common";
import api from "../middlewares/protectedInterceptor";

export const getDashBoardDataService = async (endpoint: string) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data
};
