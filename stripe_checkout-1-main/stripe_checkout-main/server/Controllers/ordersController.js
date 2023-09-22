const initStripe = require("../stripe");
const stripe = initStripe();
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, "..", "data", "orders.json");

const ordersController = async (req, res) => {
  try {
    // Retrieve the session information from Stripe using the sessionId
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

    // Check if the payment status is 'paid'
    if (session.payment_status !== "paid") {
      return res.status(400).json({ verified: false });
    }

    // Retrieve line items associated with the session
    const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);

    // Create an order object based on the session and line items
    const order = {
      created: session.created,
      customer: session.customer_details.name,
      products: line_items.data.map(item => {
        return {
          product: item.description,
          price: item.price.unit_amount / 100, // Convert price to the appropriate unit
          quantity: item.quantity,
        };
      })
    };

    let orders = [];

    orders.push(order);

    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    res.status(200).json({ verified: true });

  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong...');
  }
}

module.exports = { ordersController };
