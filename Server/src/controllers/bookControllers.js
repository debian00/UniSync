const { Book, Genre, Review } = require("../database/db");
const { Op } = require("sequelize");

const getAllBooksController = async (req) => {

  //Queries de page y size
  const { query } = req;
  const pageAsNumber = Number.parseInt(query.page);
  const sizeAsNumber = Number.parseInt(query.size);
  const {
    genre,
    author
  } = req.query;

  //Logica para la pagina y numero de items
  let page = 1;
  let size = 10;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
    page = pageAsNumber;
  }
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber <= 10) {
    size = sizeAsNumber;
  }

 // Filtros condicionales para géneros literarios y autores
 const filter = {};

 if (author) {
   filter.author = author;
 }

 if (genre) {
   filter.genre = genre;
 }

 const books = await Book.findAndCountAll({
   where: filter,
   limit: size,
   offset: (page - 1) * size,
 });

 return books;
}

const getBookByNameController = async (title) => {
  const book = await Book.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
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
    await updateBook.update(
      title,
      author,
      description,
      genre,
      publicationYear,
      images,
      sellPrice,
      stock,
      availability
    )
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
