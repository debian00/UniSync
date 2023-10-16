require("dotenv").config();
const mercadopage = require("mercadopago");

const createOrder = async (req, res) => {
  mercadopage.configure({
    access_token: process.env.MERCADOPAGO_API_KEY,
  });

  const { title, author, price, quantity } = req.body;

  if (!title || !author || !price || !quantity) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  try {
    const result = await mercadopage.preferences.create({
      items: [
        {
          title,
          description: `Autor: ${author}`, // Agregar el autor como descripción
          unit_price: price * quantity,
          currency_id: "USD",
          quantity,
        },
      ],
      notification_url: "http://localhost:3001/pay/mercadoPago/webhook",
      back_urls: {
        success: "http://localhost:3001/pay/mercadoPago/success",
        pending: "http://localhost:3001/pay/mercadoPago/pending",
        failure: "http://localhost:3001/pay/mercadoPago/failure",
      },
    });

    console.log(result);

    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

module.exports = { 
  receiveWebhook, 
  createOrder 
};