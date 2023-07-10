import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/interceptors";

export const stripePaymentService = async (
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
