import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { payWithStripeU } from '../../app/usecases/payment/stripe';
import { PaymentServiceInterface } from '../../app/services/paymentServiceInterface';
import { PaymentServiceImpl } from '../../frameworks/services/paymentService';

const paymentController = (
  paymentServiceInterface: PaymentServiceInterface,
  paymentServiceImpl: PaymentServiceImpl
) => {
  const paymentService = paymentServiceInterface(paymentServiceImpl());

  const payWithStripe = asyncHandler(async (req: Request, res: Response) => {
    const paymentInfo: { id: string; amount: number } = req.body;
    const response = await payWithStripeU(paymentInfo, paymentService);
    console.log(response);
    res.status(200).json({
      status: 'success',
      message: 'Successfully completed payment',
      data: null
    });
  });

  return {
    payWithStripe
  };
};

export default paymentController;
