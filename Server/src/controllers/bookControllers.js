const { Book, Genre, Review } = require("../database/db");
const { Op } = require("sequelize");

const getAllBooksController = async (req) => {
  const { page = 1, size = 10 } = req.query;

  // Validación de parámetros
  const pageNumber = parseInt(page, 10); // Convertir a número entero
  const pageSize = parseInt(size, 10);   // Convertir a número entero

  if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 0 || pageSize <= 0) {
    throw new Error("Parámetros de paginación inválidos.");
  }

  const filter = {}

  // Configuración de opciones
  const options = {
    where: filter,
    limit: pageSize,
    offset: (pageNumber - 1) * pageSize,
    // Agrega una ordenación aquí si es necesario
  };

  // Consulta y conteo de libros
  const books = await Book.findAndCountAll(options);
  return books;
};


const getBookByNameController = async (name) => {
  const book = await Book.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    }
  })
  return book;
}

const getBookByIdController = async (id) => {
  const book = await Book.findOne({
    where: {
      id: id
    }
  })
  return book;
}

const createBookController = async (
  title,
  author,
  description,
  genre,
  publicationYear,
  images,
  sellPrice,
  stock
) => {
  /*
  Ya que no tenemos nombre unico para publicar un libro
  validamos que no exista un libro que cuente con los
  siguientes campos iguales a uno ya creado, asi evitamos
  duplicados
  */
  const book = await Book.findOne({
    where: {
      title: title,
      author: author,
      genre: genre,
      publicationYear: publicationYear,
    }
  })
  if (book) { return "Libro existente" }
  const newBook = await Book.create({
    title,
    author,
    description,
    genre,
    publicationYear,
    images,
    sellPrice,
    stock
  })
  for (let i = 0; i < genre.length; i++) {
  await newBook.addGenre(genre[i])
  }
  return newBook
}

const updateBookController = async (
  id,
  title,
  author,
  description,
  genre,
  publicationYear,
  images,
  sellPrice,
  stock,
  availability
) => {
  try {
    const updateBook = await Book.findOne({ where: { id: id } })
    await updateBook.update({
      title,
      author,
      description,
      genre,
      publicationYear,
      images,
      sellPrice,
      stock,
      availability
    })
    return updateBook
  } catch (error) {
    console.log(error)
  }
}

const deleteBookController = async (id) => {
  try {
    await Book.destroy({ where: { id: id } })
    return "Se quema la biblioteca de alejandria! Libro destruido con exito."
  } catch (error) {
    console.log(error)
  }
}
const pauseBookController = async (id) => {
  try {
    const book = await Book.findOne({ where: { id: id } })
    if (book) {
      await book.update({ availability: false })
      return "Editado con exito"
    }
    return "Libro no encontrado"
  } catch (error) {
    console.log(error)
  }
}

const restoreBookController = async (id) => {
  try {
    const book = await Book.findOne({ where: { id: id } })
    if (book) {
      await book.update({ availability: true })
      return "Editado con exito"
    }
    return "Libro no encontrado"
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllBooksController,
  getBookByNameController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController,
  pauseBookController,
  restoreBookController
}
