const { User, Cart } = require("../database/db");
const { Op } = require("sequelize");


const  getUserCartController = async (userId) => {
try {
  const userCart = Cart.findAll({where:{userId}})
  return userCart
} catch (error) {
console.log(error)  
throw error
}
}

const  addItemToCartController = async (userId, bookId) => {
try {
  //add bookid where userid
} catch (error) {
console.log(error)  
throw error
}
}

const  updateBookQuantityController = async (userId, bookId, quantity) => {
try {
  //patch quantity where userid & bookid
} catch (error) {
console.log(error)  
throw error
}
}

const  deleteItemFromCartController = async (userId, bookId) => {
try {
  //delete where userid & bookid
} catch (error) {
console.log(error)  
throw error
}
}




module.exports ={
getUserCartController,
addItemToCartController,
updateBookQuantityController,
deleteItemFromCartController
}