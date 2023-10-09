const { Router } = require("express");
const { createSession } = require("../../configuration/payments/stripe");

const stripeRouter = Router();

stripeRouter.post("/create-checkout-session", createSession);

stripeRouter.get("/success", (req, res) => res.redirect("/success.html"));

stripeRouter.get("/cancel", (req, res) => res.redirect("/cancel.html"));

module.exports = stripeRouter;