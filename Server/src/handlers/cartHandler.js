const {
  getUserCartController,
  addItemToCartController,
  updateBookQuantityController,
  deleteItemFromCartController
} = require ("../controllers/cartController")



const getUserCartHandler = async (req,res) => {
const { userId } = req.params
try {
  const userCart = await getUserCartController(userId)
  res.status(200).json(userCart)
} catch (error) {
  console.log(error)
  res.status(400).json()
}
}

const addItemToCartHandler = async (req,res) => {
  const { userId } = req.params
  const { bookId } = req.body
try {
  const userCart = await addItemToCartController(userId, bookId)

  res.status(200).json(userCart)
  // res.status(200).json("Libro agregado al carrito con exito")
} catch (error) {
  console.log(error)
  res.status(400).json("Error al agregar el libro al carrito")
}
}

const updateBookQuantityHandler = async (req,res) => {
const { userId } = req.params
const { bookId , quantity} = req.body
try {
  const userCart = await updateBookQuantityController(userId,bookId,quantity)
  res.status(200).json(userCart)
  // res.status(200).json("Cantidad actualizada con exito")
} catch (error) {
  console.log(error)
  res.status(400).json("Error al actualizar la cantidad")
}
}

const deleteItemFromCartHandler = async (req,res) => {
  const { userId, bookId } = req.params
try {
  const userCart = await deleteItemFromCartController(userId, bookId )
  res.status(200).json(userCart)
  // res.status(200).json("Libro eliminado del carrito con exito")
} catch (error) {
  console.log(error)
  res.status(400).json("Error al eliminar el libro del carrito")
}
}


module.exports= {
getUserCartHandler,
addItemToCartHandler,
updateBookQuantityHandler,
deleteItemFromCartHandler,
}