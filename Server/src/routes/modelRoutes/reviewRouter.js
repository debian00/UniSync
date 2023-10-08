const { Router } = require("express");
const {
    getAllReviewsHandler,
    getReviewByIdHandler,
    createReviewHandler,
    updateReviewHandler,
    deleteReviewHandler,
    bookReviewHandler
} = require("../../handlers/reviewHandler");

const reviewRouter = Router();

//Trae todas las ventas
reviewRouter.get("/", getAllReviewsHandler),
//Trae una venta buscada por Id
reviewRouter.get("/:id", getReviewByIdHandler);
//Crea una venta
reviewRouter.post("/create", createReviewHandler);
//Actualiza datos de una venta existente
reviewRouter.put("/update/:id", updateReviewHandler);
//Elimina una venta
reviewRouter.delete("/delete/:id", deleteReviewHandler);
//Review hechas al libro
reviewRouter.get("/book/:id", bookReviewHandler)
module.exports = reviewRouter;
