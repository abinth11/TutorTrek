import { stripePaymentService } from "../../services/payment/stripeService";
import END_POINTS from "../../../constants/endpoints";

export const stripePayment = (paymentInfo:{id:string,amount:number}) => {
  return stripePaymentService(END_POINTS.PAY_USING_STRIPE,paymentInfo);
};
