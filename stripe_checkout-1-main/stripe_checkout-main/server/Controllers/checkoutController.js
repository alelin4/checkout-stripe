const initStripe = require("../stripe");
const stripe = initStripe();  // Initialize Stripe

const CLIENT_URL = "http://localhost:5173";

// Controller function to handle the checkout process
const checkoutController = async (req, res) => {
  try {
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),
      customer: req.session.stripeCustomerId,  // Customer ID from session
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,  // URL to redirect on success
      cancel_url: CLIENT_URL,  // URL to redirect on cancellation
      allow_promotion_codes: true,
    });

    // Return session URL and ID to the client
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong...");
  }
};

module.exports = { checkoutController };  // Export the checkout controller
