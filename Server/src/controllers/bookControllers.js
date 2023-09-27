const { Book, Genre, Review } = require("../database/db");
const { Op } = require("sequelize");

const getAllBooks = async () => {
   
    const books = await Book.findAndCountAll();
    return books;

}

const getBookByName = async (name) => {
    const book = await Book.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      }
    })
    return book;
}
  
const getBookById = async (id) => {
    const book = await Book.findOne({
      where: {
        id:id
      }
    })
    return book;
}

module.exports = {
    getAllBooks,
    getBookById,
    getBookByName

}
