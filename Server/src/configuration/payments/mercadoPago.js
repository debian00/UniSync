require("dotenv").config();
const mercadopage = require("mercadopago");

const createOrder = async (req, res) => {
  mercadopage.configure({
    access_token: process.env.MERCADOPAGO_API_KEY,
  });

  const { items } = req.body;
  //? Multiple compras
  const lineItem = items.map((ele) => {
    return {
      title: ele.book.title,
      unit_price: ele.book.sellPrice,
      currency_id: "ARS",
      quantity: ele.quantity,
      id: ele.id,
      picture_url: ele.book.images[0],
    };
  });

  try {
    const result = await mercadopage.preferences.create({
      items: lineItem,
      back_urls: {
        success: "http://localhost:3001/pay/mercadoPago/success",
        pending: "http://localhost:3001/pay/mercadoPago/pending",
        failure: "http://localhost:3001/pay/mercadoPago/failure",
      },
    });

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
  createOrder,
};
