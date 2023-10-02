const {
    getAllSaleController,
    getSaleByIdController,
    createSaleController,
    updateSaleController,
    deleteSaleController
} = require("../controllers/saleController");

//Trae todas las ventas
const getAllSaleHandler = async (req, res) => {
    try {
      const response = await getAllSaleController()
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(400).json('Error al traer todas las ventas')
    }
  }

//Trae las ventas por id
const getSaleByIdHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getSaleByIdController(id)
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(404).json('Venta no encontrada por Id');
    }
};
//Crea una venta
const createSaleHandler = async (req, res) => {
    const {
        userId,
        bookId,
        purchaseDate,
        totalPrice,
        quantity,
        paymentMethod,
        deliveryLocation
    } = req.body
    try {
        const response = await createSaleController({
            userId,
            bookId,
            purchaseDate,
            totalPrice,
            quantity,
            paymentMethod,
            deliveryLocation
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json("Error en la creacion de la venta")
    }
};

// Modifica datos de una venta
const updateSaleHandler = async (req, res) => {
    const { id } = req.params
    const { 
        userId,
        bookId,
        purchaseDate,
        totalPrice,
        quantity,
        paymentMethod,
        deliveryLocation
     } = req.body
    try {
        const modifiedSale = await updateSaleController({
            id,
            userId,
            bookId,
            purchaseDate,
            totalPrice,
            quantity,
            paymentMethod,
            deliveryLocation
        })
      res.status(200).json(modifiedSale)
    } catch (error) {
      console.log(error)
      res.status(400).json('No se pudo actualizar la venta')
    }
  }
//Borra una venta
const deleteSaleHandler = async (req, res) => {
    const {id} = req.params
    try {
      const response = await deleteSaleController(id)
      res.status(204).json(` La venta cuyo id es:  ${id} se borró con éxito`)
    } catch (error) {
      console.log(error)
      res.status(404).json(` La venta cuyo id es:  ${id} no se pudo borrar`)
    }
  }

module.exports = {
    getSaleByIdHandler,
    createSaleHandler,
    getAllSaleHandler,
    updateSaleHandler,
    deleteSaleHandler
}