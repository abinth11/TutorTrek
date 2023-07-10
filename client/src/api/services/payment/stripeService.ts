import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/interceptors";

export const createStripePaymentService = async (
  endpoint: string,
  paymentInfo: { id: string, amount: number; }
) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
    {
      paymentInfo,
    }
  );
  return response.data
};

export const getConfigService = async (
  endpoint: string,
) => {
  const response = await api.get(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data
};
