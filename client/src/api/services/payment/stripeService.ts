import CONSTANTS_COMMON from "../../../constants/common";
import api from "../../middlewares/protectedInterceptor";
import { PaymentIntent } from "@stripe/stripe-js";

export const createStripePaymentService = async (
  endpoint: string,
  courseId:string
) => {
  const response = await api.post(
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`,
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
    `${CONSTANTS_COMMON.API_BASE_URL}/${endpoint}`
  );
  return response.data
};

