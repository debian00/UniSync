const { Router } = require("express");
const { createSession } = require("../../configuration/payments/stripe");

const stripeRouter = Router();

stripeRouter.post("/create-checkout-session", createSession);

stripeRouter.get("/success", (req, res) =>
  res.redirect("http://localhost:5173/success")
);

stripeRouter.get("/cancel", (req, res) =>
  res.redirect("http://localhost:5173/canceled")
);

module.exports = stripeRouter;
