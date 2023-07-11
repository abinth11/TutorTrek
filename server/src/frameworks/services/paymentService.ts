import configKeys from '../../config';
import Stripe from 'stripe';

const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
  // maxNetworkRetries: 2,
  // timeout: 3000,
  // telemetry: false
});

export const paymentService = () => {
  const createPaymentIntent = async (amount:number) => {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'INR',
      amount: amount*100,
      automatic_payment_methods: { enabled: true }
    });
    return paymentIntent;
  };

  const getConfig = () => configKeys.STRIPE_PUBLISHABLE_KEY;

  return {
    createPaymentIntent,
    getConfig
  };
};

export type PaymentServiceImpl = typeof paymentService;
