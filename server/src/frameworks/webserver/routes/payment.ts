import express from 'express';
import { paymentService } from '../../../frameworks/services/paymentService';
import { paymentServiceInterface } from '../../../app/services/paymentServiceInterface';
import paymentController from '../../../adapters/controllers/paymentController';

const paymentRouter = () => {
  const router = express.Router();
  const controller = paymentController(paymentServiceInterface, paymentService);
  
  router.get('/stripe/get-config',controller.getConfig)
  
  router.post('/stripe/create-payment-intent', controller.createPaymentIntent);

  return router;
};

export default paymentRouter;
