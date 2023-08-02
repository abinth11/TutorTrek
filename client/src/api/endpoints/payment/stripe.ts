import {
  createStripePaymentService,
  getConfigService,
} from "../../services/payment/stripe-service";
import END_POINTS from "../../../constants/endpoints";

export const createStripePayment = (courseId:string) => {
  return createStripePaymentService(END_POINTS.PAY_USING_STRIPE, courseId);
};

export const getConfig = () => {
  return getConfigService(END_POINTS.GET_CONFIG);
};



