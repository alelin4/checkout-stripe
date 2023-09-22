import { useEffect, useState } from 'react';
import { AiOutlineCoffee } from 'react-icons/ai';

const Confirmation = () => {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);

  useEffect(() => {
    // Retrieve session ID from local storage
    const sessionId = localStorage.getItem("session-id");

    // Function to verify payment
    const verifyPayment = async () => {
      const response = await fetch(
        "/api/order-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        }
      );

      const { verified } = await response.json();

      if (verified) {
        // If payment is verified, set isPaymentVerified to true and remove session ID from local storage
        setIsPaymentVerified(true);
        localStorage.removeItem("session-id");
      } else {
        // If payment is not verified, set isPaymentVerified to false
        setIsPaymentVerified(false);
      }
    };

    // Call the function to verify payment
    verifyPayment();
  }, []); // Empty dependency array to run this effect only once when component mounts

  return (
    // Display a message based on payment verification status
    isPaymentVerified ? (
      <h1>
        Thank you for your purchase, enjoy a cup of <AiOutlineCoffee /> while you wait for your order.
      </h1>
    ) : (
      <h1>Something went wrong</h1>
    )
  );
}

export default Confirmation;