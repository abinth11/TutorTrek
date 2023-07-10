import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import {
  getConfig,
  createStripePayment,
} from "../../../api/endpoints/payment/stripe";
import { useParams } from "react-router-dom";

function StripeContainer() {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const {courseId} = useParams()

  const fetchConfig = async () => {
    try {
      const response = await getConfig();
      const publishableKey = response.data;
      console.log(publishableKey);
      setStripePromise(() => loadStripe(publishableKey));
    } catch (error) {
      console.log(error);
    }
  };
  const paymentIntentHandler = async () => {
    try {
      const response = await createStripePayment(courseId??"");
      const { clientSecret } = response.data;
      console.log(clientSecret);
      setClientSecret(clientSecret);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    paymentIntentHandler();
  }, []);

  return (
    <div className='p-5 flex items-center h-screen justify-center '>
      <div className=" w-1/2">
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default StripeContainer;
