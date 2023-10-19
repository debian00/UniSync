const { Sale, Book, User } = require("../database/db");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs"); // Asegúrate de requerir fs
const templatePath = path.join(
  __dirname,
  "../configuration/mailingTemplates/Comprar Libro",
  "index.html"
);

//Crea una nueva venta
const createSaleController = async ({
  userId,
  bookId,
  purchaseDate,
  totalPrice,
  quantity,
  paymentMethod,
  cartId,
}) => {
  try {
    const newSale = await Sale.create({
      userId,
      bookId,
      purchaseDate,
      totalPrice,
      quantity,
      paymentMethod,
      cartId,
    });

    const userid = await User.findByPk(userId);
    const bookid = await Book.findByPk(bookId);
    const emailuser = userid.email;
    console.log("user", emailuser);
    console.log("libro", bookid);

    fs.readFile(templatePath, "utf8", async (err, html) => {
      if (err) {
        console.error("Error al leer el archivo de plantilla:", err);
      }
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, // Cambiado de "post" a "port"
        secure: true,
        auth: {
          user: "thenextpage@grupo-cava.com",
          pass: "thenextpage00",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      html = html.replace(
        '<p id="fechaVenta"></p>',
        `<p id="fechaVenta">${purchaseDate}</p>`
      );
      html = html.replace("{IMAGE_SRC}", bookid.images[0]);
      html = html.replace(
        '<strong id="nombreLibroVenta"></strong>',
        `<strong id="nombreLibroVenta">${bookid.title}</strong>`
      );
      html = html.replace(
        '<p id="autorLibroVenta"></p>',
        `<p id="autorLibroVenta">${bookid.author}</p>`
      );
      html = html.replace(
        '<p id="cantidadLibroVenta"></p>',
        `<p id="cantidadLibroVenta">Cantidad: ${quantity}</p>`
      );
      html = html.replace(
        '<p id="precioLibroVenta">$</p>',
        `<p id="precioLibroVenta">$ ${bookid.sellPrice}</p>`
      );
      html = html.replace(
        '<p id="precioTotalLibroVenta">Total:</p>',
        `<p id="precioTotalLibroVenta">Total: ${totalPrice}</p>`
      );

      // html = html.replace('<strong id="userPassword"></strong>', `<strong id="userPassword">${text}</strong>`);
      // html = html.replace('<img id="imagenLibroVenta" class="adapt-img" src="" alt style="display: block;" width="70" />', `<img id="imagenLibroVenta" class="adapt-img" src=${bookid.images[0]} alt style="display: block;" width="70" />`);
      // Detalles del correo
      const mailOptions = {
        from: "thenextpage@grupo-cava.com",
        to: emailuser, // Utiliza la dirección del destinatario proporcionada en el cuerpo de la solicitud
        subject: "Datos de tu compra!",
        html: html, // Puedes cambiar esto a HTML si lo deseas
      };

      transporter.sendMail(mailOptions);
    });

    return newSale;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Trae todas las ventas
const getAllSaleController = async () => {
  try {
    const sales = await Sale.findAll();
    return sales;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
//Trae una venta por Id
const getSaleByIdController = async (id) => {
  try {
    const sale = await Sale.findOne({
      where: {
        id: id,
      },
    });
    return sale;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getSaleByUserIdController = async (userId) => {
  try {
    const sale = await Sale.findAll({
      where: { userId },
    });

    const bookIds = sale.map((saleItem) => saleItem.bookId);

    const booksInCart = await Book.findAll({
      where: {
        id: {
          [Op.in]: bookIds,
        },
      },
    });

    const saleWithBooks = sale.map((saleItem) => {
      const bookData = booksInCart.find((book) => book.id === saleItem.bookId);
      return {
        ...saleItem.dataValues,
        book: bookData,
      };
    });

    return saleWithBooks;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Modifica una venta
const updateSaleController = async (
  id,
  {
    userId,
    bookId,
    purchaseDate,
    totalPrice,
    quantity,
    paymentMethod,
    deliveryLocation,
  }
) => {
  const saleToUpdate = await Sale.findByPk(id);
  try {
    const updatedSale = await saleToUpdate.update({
      userId,
      bookId,
      purchaseDate,
      totalPrice,
      quantity,
      paymentMethod,
      deliveryLocation,
    });

    return updatedSale;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
//Elimina una venta
const deleteSaleController = async (id) => {
  try {
    const saleToDelete = await Sale.findOne({
      where: {
        id: id,
      },
    });

    if (saleToDelete) {
      await saleToDelete.destroy();
      return "Venta eliminada con éxito";
    } else {
      throw new Error("Venta no encontrada con ID " + id);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllSaleController,
  getSaleByIdController,
  createSaleController,
  updateSaleController,
  getSaleByUserIdController,
  deleteSaleController,
};
