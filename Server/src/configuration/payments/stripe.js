require("dotenv").config();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const createSession = async (req, res) => {
  try {
    const { items } = req.body;

    //? Multiple compras
    const lineItem = items.map((ele) => {
      return {
        price_data: {
          product_data: {
            name: ele.book.title,
            description: `Author: ${ele.book.author}`,
          },
          currency: "usd",
          unit_amount: ele.price,
        },
        quantity: ele.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItem,
      mode: "payment",
      success_url: "http://localhost:3001/pay/stripe/success",
      cancel_url: "http://localhost:3001/pay/stripe/cancel",
    });

    console.log(session);
    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createSession };
