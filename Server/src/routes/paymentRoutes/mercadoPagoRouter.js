const { Router } = require("express");
const {
  createOrder,
  receiveWebhook,
} = require("../../configuration/payments/mercadoPago");

const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/create-order", createOrder);

mercadoPagoRouter.post("/webhook", receiveWebhook);

mercadoPagoRouter.get("/success", (req, res) => res.send("Success"));

mercadoPagoRouter.get("/failure", (req, res) => res.send("Failure"));

mercadoPagoRouter.get("/pending", (req, res) => res.send("Pending"));

module.exports =  mercadoPagoRouter;