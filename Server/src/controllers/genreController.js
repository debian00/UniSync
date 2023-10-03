const { Book, Genre } = require('../database/db')
const { Op } = require("sequelize");


//Trae todos los géneros
const getAllGenresController = async () => {
  try {
    const response = await Genre.findAll()
    return response
  } catch (error) {
    console.error(error);
    throw error;
  }
}


//Trae un género por nombre
const getGenreByNameController = async (name) => {
  try {
    const response = await Genre.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return response
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// Trae un género por id
const getGenreByIdController = async (id) => {
  try {
    const response = await Genre.findOne({
      where: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Publica un nuevo género
const createGenreController = async ({ name }) => {
  try {
    const existent = await Genre.findOne({where:{name:name}})
    if(!existent){
    const response = await Genre.create({ name });
    return response;}
    return "El genero ya existe"
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Elimina un género
const deleteGenreController = async (id) => {
  try {
    const response = await Genre.findOne({
      where: {
        id: id
      }
    });

    if (response) {
      await response.destroy(); 
      return "Género eliminado con éxito";
    } else {
      throw new Error("Género no encontrado con ID " + id);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createGenreController,
  deleteGenreController,
  getAllGenresController,
  getGenreByIdController,
  getGenreByNameController
}