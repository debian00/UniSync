const { Router } = require("express");
const {
  getAllSaleHandler,
  getSaleByIdHandler,
  createSaleHandler,
  updateSaleHandler,
  deleteSaleHandler,
  getSaleByUserIdHandler,
} = require("../../handlers/saleHandler");

const saleRouter = Router();

//Trae todas las ventas
saleRouter.get("/", getAllSaleHandler),
  //Trae una venta buscada por Id
  saleRouter.get("/:id", getSaleByIdHandler);
//Ventas de usuario
saleRouter.get("/user/:userId", getSaleByUserIdHandler);
//Crea una venta
saleRouter.post("/create", createSaleHandler);
//Actualiza datos de una venta existente
saleRouter.put("/update/:id", updateSaleHandler);
//Elimina una venta
saleRouter.delete("/delete/:id", deleteSaleHandler);

module.exports = saleRouter;
