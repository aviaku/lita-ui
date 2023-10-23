import { PaymentElement, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ depositAmount }) {
  const { user } = useSelector((state) => ({ ...state }));
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion?userId=${user.id}&amount=${depositAmount}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* <CardElement /> */}
      <div className="form-group w-1/3 mx-auto bg-white px-5 py-10">
        <PaymentElement id="payment-element" />
        <br />
        {/* align pay button to the right */}
        <div className="flex justify-end">
          <button
            className="btn btn-primary"
            disabled={isProcessing || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay"}
            </span>
          </button>
        </div>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </div>
    </form>
  );
}
