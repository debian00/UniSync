const { Router } = require("express");
const { createSession } = require("../../configuration/payments/stripe");

const stripeRouter = Router();


stripeRouter.post("/stripe", createSession);

stripeRouter.get("/success", (req, res) => {
  res.json("Pago realizado con exito");
});

stripeRouter.get("/cancel", (req, res) => {
  res.json("Pago cancelado");
});
module.exports =  stripeRouter;
