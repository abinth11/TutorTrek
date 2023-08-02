import CONFIG_KEYS from "../../config";
import api from "../middlewares/protected-interceptor";

export const getDashBoardDataService = async (endpoint: string) => {
  const response = await api.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response.data
};

export const getGraphDataService = async (endpoint: string) => {
  const response = await api.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response.data
};