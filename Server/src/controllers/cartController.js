const { Cart, Book } = require("../database/db");
const { Op } = require("sequelize");


const getUserCartController = async (userId) => {
  try {

    const userCart = await Cart.findAll({ where: { userId } });

    const bookFinal = [];

    for (const item of userCart) {
      const book = await Book.findOne({ where: { id: item.bookId } });
      if (book) {
        bookFinal.push({ ...book.dataValues, quantity: item.quantity });
      }
    }

    return bookFinal;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const addItemToCartController = async (userId, bookId) => {
  try {
    const existent = await Cart.findOne({ where: { userId, bookId } })
    if (existent) {
      let quantity = existent.dataValues.quantity + 1
      const userCart = await updateBookQuantityController(userId, bookId, quantity)
      return userCart
    }
    const userCart = await Cart.create({ userId, bookId })
    await userCart.setUser(userId)
    return userCart
  } catch (error) {
    console.log(error)
    throw error
  }
}

const updateBookQuantityController = async (userId, bookId, quantity) => {
  try {
    const userCart = await Cart.findOne({ where: { userId, bookId } })
    await userCart.update({ quantity })
    return userCart
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteItemFromCartController = async (userId, bookId) => {
  try {
    const userCart = await Cart.destroy({ where: { userId, bookId } })

    const newCart = await Cart.findAll({ where: { userId: userId } })
    return newCart
  } catch (error) {
    console.log(error)
    throw error
  }
}

const emptyCartController = async (userId) => {
  try {
    await Cart.destroy({ where: { userId } });

    const userCart = await Cart.create({ userId });

    return userCart;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


module.exports = {
  getUserCartController,
  addItemToCartController,
  updateBookQuantityController,
  deleteItemFromCartController,
  emptyCartController
}