import api from "../../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../../config";

export const createStripePaymentService = async (
  endpoint: string,
  courseId:string
) => {
  const response = await api.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    {
      courseId
    }
  );
  return response.data
};

export const getConfigService = async (
  endpoint: string,
) => {
  const response = await api.get(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response.data
};

