require("dotenv").config();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const createSession = async (req, res) => {

  const { name, description, author, price } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: name,
              description: description,
            },
            currency: "usd",
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3001/pay/success/`,
      cancel_url: "http://localhost:3001/pay/cancel",
    });
    console.log(session.url);
    return session.url;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createSession };
