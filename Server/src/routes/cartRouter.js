const { Router } = require("express");
const {
getUserCartHandler,
addItemToCartHandler,
updateBookQuantityHandler,
deleteItemFromCartHandler,

} = require("../handlers/cartHandler")


const cartRouter = Router();

// Obtengo el carrito del usuario ID
cartRouter.get("/:userId", getUserCartHandler)
//Agrego el libro seleccionado al carrito del usuario ID
cartRouter.post("/add/:userId",addItemToCartHandler)
//Modifico la cantidad de un libro en el carrito del usuario ID
cartRouter.patch("/update/:userId", updateBookQuantityHandler)
//Elimina del carrito del UserID el libro BookId
cartRouter.delete("/delete/:userId/:bookId", deleteItemFromCartHandler)

module.exports= cartRouter