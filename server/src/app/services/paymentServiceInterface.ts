import { PaymentServiceImpl } from '../../frameworks/services/paymentService';

export const paymentServiceInterface = (
  service: ReturnType<PaymentServiceImpl>
) => {
  const createPaymentIntent = async (paymentInfo: {
    id: string;
    amount: number;
  }) => await service.createPaymentIntent(paymentInfo);

  const getConfig = () => service.getConfig();

  return {
    createPaymentIntent,
    getConfig
  };
};

export type PaymentServiceInterface = typeof paymentServiceInterface;
