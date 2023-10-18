const { Router } = require("express");
const {
  createOrder,
  receiveWebhook,
} = require("../../configuration/payments/mercadoPago");
const mercadopago = require("mercadopago");

const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/create-order", createOrder);

mercadoPagoRouter.post("/webhook", receiveWebhook);

mercadoPagoRouter.get("/check-payment-status", async (req, res) => {
  const { payment_id } = req.query;
  console.log(payment_id);

  try {
    // Consulta el estado del pago en Mercado Pago
    const payment = await mercadopago.payment.get(payment_id);
    // Verifica el estado del pago y envía la respuesta al cliente
    res.json(payment);
    // if (payment.status === "approved") {
    //   res.json({ status: "approved" });
    // } else if (payment.status === "pending") {
    //   res.json({ status: "pending" });
    // } else {
    //   res.json({ status: "rejected" });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

mercadoPagoRouter.get("/success", (req, res) => res.send("Success"));

mercadoPagoRouter.get("/failure", (req, res) => res.send("Failure"));

mercadoPagoRouter.get("/pending", (req, res) => res.send("Pending"));

module.exports = mercadoPagoRouter;
