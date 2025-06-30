import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = () => {
  const { parcelId } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  const { isPending, data: parcelInfoById = {} } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  //   console.log(parcelInfoById);
  const amountInCents = parcelInfoById.cost * 100;
  //   console.log(amountInCents);

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

    //create a payment intent
    const { data: paymentIntent } = await axiosSecure.post(
      "/create-payment-intent",
      { amount: amountInCents }
    );

    console.log(paymentIntent);
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
          Pay ${parcelInfoById.cost}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
};

export default CheckoutForm;
