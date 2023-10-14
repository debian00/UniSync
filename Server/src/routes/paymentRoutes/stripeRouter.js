const { Router } = require("express");
const { createSession } = require("../../configuration/payments/stripe");
const { successHandler } = require("./success");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const stripeRouter = Router();

stripeRouter.post("/create-checkout-session", createSession);

stripeRouter.get("/success", successHandler);

stripeRouter.get("/check-session-status", async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.json({ session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

stripeRouter.get("/cancel", (req, res) =>
  res.redirect("http://localhost:5173/canceled")
);

module.exports = stripeRouter;
