import {
  createStripePaymentService,
  getConfigService,
} from "../../services/payment/stripeService";
import END_POINTS from "../../../constants/endpoints";

export const createStripePayment = (paymentInfo: { id: string; amount: number }) => {
  return createStripePaymentService(END_POINTS.PAY_USING_STRIPE, paymentInfo);
};

export const getConfig = () => {
  return getConfigService(END_POINTS.GET_CONFIG);
};
