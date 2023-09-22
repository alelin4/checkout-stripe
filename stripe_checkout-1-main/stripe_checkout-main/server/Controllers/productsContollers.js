const initStripe = require("../stripe");
const stripe = initStripe();

const getAllProducts = async (req, res) => {
  try {
    // Retrieve all active products along with their default prices
    const products = await stripe.products.list({
      expand: ["data.default_price"],
      active: true
    });

    // Return the products as a JSON response
    res.status(200).json(products);

  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong...');
  }
}

module.exports = { getAllProducts };
