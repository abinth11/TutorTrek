import CONSTANTS_COMMON from "../../constants/common";
import api from "../middlewares/protectedInterceptor";

export const addCategoryService = async (
  endpoint: string,
  categoryInfo: { name: string; description: string }
) => { 
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    categoryInfo
  );
  return response;
};

export const getCategoriesService = async (endpoint: string) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data;
};

export const getCategoryByIdService = async (
  endpoint: string,
  categoryId: string
) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${categoryId}`
  );
  return response.data;
};

export const editCategoryByIdService = async (
  endpoint: string,
  categoryId: string,
  categoryInfo: { name?: string; description?: string }
) => {
  const response = await api.put(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}/${categoryId}`,
    categoryInfo
  );
  return response.data;
};
