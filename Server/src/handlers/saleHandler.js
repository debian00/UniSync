const {
  getAllSaleController,
  getSaleByIdController,
  createSaleController,
  updateSaleController,
  deleteSaleController,
  getSaleByUserIdController,
} = require("../controllers/saleController");
const nodemailer = require("nodemailer");
const { User } = require("../database/db");
// const path = require('path');
// const fs = require('fs'); // Asegúrate de requerir fs
// const templatePath = path.join(__dirname, '../configuration/mailingTemplates/Peticion', 'index.html');

//Crea una venta

//Trae todas las ventas
const getAllSaleHandler = async (req, res) => {
  try {
    const response = await getAllSaleController();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error al traer todas las ventas");
  }
};

//Trae las ventas por id
const getSaleByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getSaleByIdController(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json("Venta no encontrada por Id");
  }
};

const getSaleByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await getSaleByUserIdController(userId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json("Venta no encontrada por Id");
  }
};

const createSaleHandler = async (req, res) => {
  const { itemsMapped } = req.body;
  try {
    const createdSale = [];
    itemsMapped.forEach(async (item) => {
      const {
        userId,
        bookId,
        purchaseDate,
        totalPrice,
        quantity,
        paymentMethod,
        cartId,
      } = item;

      try {
        const newSale = await createSaleController({
          userId,
          bookId,
          purchaseDate,
          totalPrice,
          quantity,
          paymentMethod,
          cartId,
        });

        createdSale.push(newSale);
        var transporter = nodemailer.createTransport({
          host: "mail.grupo-cava.com",
          port: 465,
          secure: true,
          auth: {
            user: "thenextpage@grupo-cava.com",
            pass: "thenextpage00",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const emailUser = await User.findByPk(createdSale[0].userId); // Corregido

        const mailOptions = {
          from: "thenextpage@grupo-cava.com",
          to: emailUser.email, // Usar la dirección de correo del usuario
          subject: "Gracias por seleccionarnos",
          text: "Hola como estas?",
        };

        transporter.sendMail(mailOptions);
      } catch (error) {
        console.error("Error al crear venta:", error);
      }
    });

    res.status(200).json(createdSale);
  } catch (error) {
    console.error(error);
    res.status(400).json("Error en la creación de la venta");
  }
};

// Modifica datos de una venta
const updateSaleHandler = async (req, res) => {
  const { id } = req.params;
  const {
    userId,
    bookId,
    purchaseDate,
    totalPrice,
    quantity,
    paymentMethod,
    deliveryLocation,
  } = req.body;
  try {
    const modifiedSale = await updateSaleController({
      id,
      userId,
      bookId,
      purchaseDate,
      totalPrice,
      quantity,
      paymentMethod,
      deliveryLocation,
    });
    res.status(200).json(modifiedSale);
  } catch (error) {
    console.log(error);
    res.status(400).json("No se pudo actualizar la venta");
  }
};
//Borra una venta
const deleteSaleHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteSaleController(id);
    res.status(204).json(` La venta cuyo id es:  ${id} se borró con éxito`);
  } catch (error) {
    console.log(error);
    res.status(404).json(` La venta cuyo id es:  ${id} no se pudo borrar`);
  }
};

module.exports = {
  getSaleByIdHandler,
  createSaleHandler,
  getAllSaleHandler,
  updateSaleHandler,
  getSaleByUserIdHandler,
  deleteSaleHandler,
};
