const { Book, Author } = require('../database/db')
const { Op } = require("sequelize");


// Trae todos los autores
const getAllAuthorsController = async () => {
  try {
    const authors = await Author.findAll();
    return authors;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Traer autores por nombre
const getAuthorByNameController = async (name) => {
  try {
    const author = await Author.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return author;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Trae autores por id
const getAuthorByIdController = async (id) => {
  try {
    const author = await Author.findOne({
      where: {
        id: id,
      },
    });
    return author;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



//Modifica el nombre de un autor
const updateAuthorController = async (id, { name }) => { // Cambia el orden de los argumentos
  const authorToUpdate = await Author.findByPk(id);
  try {
    const updatedAuthor = await authorToUpdate.update({ name });

    return updatedAuthor;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Publica un nuevo autor
const createAuthorController = async ({ name }) => {
  try {
    const createdAuthor = await Author.create({ name });
    return createdAuthor;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Elimina un autor
const deleteAuthorController = async (id) => {
  try {
    const authorToDelete = await Author.findOne({
      where: {
        id: id
      }
    });

    if (authorToDelete) {
      await authorToDelete.destroy(); 
      return "Autor eliminado con éxito";
    } else {
      throw new Error("Autor no encontrado con ID " + id);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllAuthorsController,
  getAuthorByNameController,
  getAuthorByIdController,
  updateAuthorController,
  createAuthorController,
  deleteAuthorController
}