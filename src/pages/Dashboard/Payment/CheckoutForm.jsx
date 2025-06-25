import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router";

const CheckoutForm = () => {
  const { parcelId } = useParams();
  console.log(parcelId);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("[error]", error);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
  };
  return (
    <>
      <form
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button
          className="btn btn-primary w-full text-black"
          type="submit"
          disabled={!stripe}
        >
          Pay for delivery
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
};

export default CheckoutForm;
