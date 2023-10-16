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
      notification_url: "https://the-next-page.vercel.app/pay/mercadoPago/webhook",
      back_urls: {
        success: "https://the-next-page.vercel.app/pay/mercadoPago/success",
        pending: "https://the-next-page.vercel.app/pay/mercadoPago/pending",
        failure: "https://the-next-page.vercel.app/pay/mercadoPago/failure",
      },
    });

    console.log(result);

    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
