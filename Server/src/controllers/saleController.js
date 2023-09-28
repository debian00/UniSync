const { Sale } = require("../database/db")
const { Op } = require("sequelize");

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
//Crea una nueva venta
const createSaleController = async ({
    userId,
    bookId,
    purchaseDate,
    totalPrice,
    quantity,
    paymentMethod,
    deliveryLocation
}) => {
    try {
        const newSale = await Sale.create({
            userId,
            bookId,
            purchaseDate,
            totalPrice,
            quantity,
            paymentMethod,
            deliveryLocation
        });
        return newSale;
        
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//Modifica una venta
const updateSaleController = async (id,
    {
        userId,
        bookId,
        purchaseDate,
        totalPrice,
        quantity,
        paymentMethod,
        deliveryLocation
    }) => {
    const saleToUpdate = await Sale.findByPk(id);
    try {
        const updatedSale = await saleToUpdate.update({
            userId,
            bookId,
            purchaseDate,
            totalPrice,
            quantity,
            paymentMethod,
            deliveryLocation
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
          id: id
        }
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
    deleteSaleController
}
