import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { StoreContext } from "../context/StoreContext";

function Checkout() {
  // Get the cart and data (including loggedInUserId) from contexts
  const { cart } = useContext(ProductContext);
  const { data } = useContext(StoreContext);
  const loggedInUserId = data.stripeCustomerId;

  // Function to handle the payment process
  async function handlePayment() {
    const response = await fetch(
      "/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      }
    );

    if (!response.ok) {
      return;
    }

    const { url, sessionId } = await response.json();
    localStorage.setItem("session-id", sessionId);
    window.location = url;
  }

  return (
    <div className="checkout">
      {loggedInUserId ? (
        <>
          <h3>Welcome, {data.username}</h3>
          <button className="cart_btn" onClick={handlePayment}>
            Proceed to checkout
          </button>
        </>
      ) : (
        <p>Login to place an order</p>
      )}
    </div>
  );
}

export default Checkout;