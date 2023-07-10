import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
  CardElement,
} from "@stripe/react-stripe-js";
import { StripeCardElement, PaymentMethod } from "@stripe/stripe-js";
import { stripePayment } from "../../../api/endpoints/payment/stripe";

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      "::webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const PaymentForm: React.FC = () => {
  const [success, showSuccess] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe or Elements not loaded yet, handle error
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) as StripeCardElement,
    });

    if (error) {
      // Handle error
      console.log(error);
    } else {
      // Payment method created successfully
      console.log(paymentMethod);
      try {
        const { id } = paymentMethod as PaymentMethod;
        const paymentInfo = {
          id,
          amount: 1000,
        };
        const response = await stripePayment(paymentInfo);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <label>
        Card Number
        <CardNumberElement />
      </label>
      <label>
        Expiry Date
        <CardExpiryElement />
      </label>
      <label>
        CVC
        <CardCvcElement />
      </label> */}
      <CardElement options={CARD_OPTIONS} />
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
