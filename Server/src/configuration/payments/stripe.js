require("dotenv").config();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const createSession = async (req, res) => {
  try {
 
    const { title, author, price, quantity } = req.body;

  
    const lineItem = {
      price_data: {
        product_data: {
          name: title,        
          description: `Autor: ${author}`,
        },
        currency: "usd",
        unit_amount: price * 100,
      },
      quantity: quantity,
    };

    const session = await stripe.checkout.sessions.create({
      line_items: [lineItem],
      mode: "payment",
      success_url: "http://localhost:3001/success",
      cancel_url: "http://localhost:3001/cancel",
    });

    console.log(session);
    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createSession };
