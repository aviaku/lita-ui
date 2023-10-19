import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const location = useLocation();
  const depositAmount = location.state.amount;
  // const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe(
    "pk_test_51M6UVmSA1CggwQAXwIMMiA3eihUpDopPkCdNzHS5llYG0wuOLxqtJpWM4e04tF2A7SA4bFj0oRPVJr4lZLgPg7SX00KkGhKkYy"
  );

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/config`).then(async (r) => {
  //     const { publishableKey } = await r.json();
  //     setStripePromise(loadStripe(publishableKey));
  //   });
  // }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/stripe/create-payment-intent`, {
      method: "POST",
      body: JSON.stringify({ amount: depositAmount * 100, currency: "INR" }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, [depositAmount]);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm depositAmount={depositAmount} />
        </Elements>
      )}
    </>
  );
}

export default Payment;
