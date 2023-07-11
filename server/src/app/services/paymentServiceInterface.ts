import { PaymentServiceImpl } from '../../frameworks/services/paymentService';

export const paymentServiceInterface = (
  service: ReturnType<PaymentServiceImpl>
) => {
  const createPaymentIntent = async (amount:number) => await service.createPaymentIntent(amount);

  const getConfig = () => service.getConfig()

  return {
    createPaymentIntent,
    getConfig
  };
};

export type PaymentServiceInterface = typeof paymentServiceInterface;
