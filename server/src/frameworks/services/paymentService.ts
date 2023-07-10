import configKeys from '../../config';
import Stripe from 'stripe';

const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
    maxNetworkRetries: 2,
    timeout: 3000,
    telemetry: false,
  });
  
export const paymentService = () => {
  const payUsingStripe = async (paymentInfo: {
    id: string;
    amount: number;
  }) => {
    const payment = await stripe.paymentIntents.create({
      amount: paymentInfo.amount,
      currency: 'INR',
      description: 'TutorTrek',
      payment_method: paymentInfo.id,
      confirm: true
    });
    console.log('Payment', payment);
    return payment;
  };
  return {
    payUsingStripe
  };
};

export type PaymentServiceImpl = typeof paymentService;
