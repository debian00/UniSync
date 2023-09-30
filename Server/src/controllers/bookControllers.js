const { Book, Genre, Review } = require("../database/db");
const { Op } = require("sequelize");

const getAllBooksController = async (req) => {

  //Queries de page y size
  const { query } = req;
  const pageAsNumber = Number.parseInt(query.page);
  const sizeAsNumber = Number.parseInt(query.size);
  const {
    name,
    genre,
    author,
    priceMin,
    priceMax,
    pagesMin,
    pagesMax,
    scoreMin,
    scoreMax,
    availability,
  } = req.query;
  
  
  
  
  
  
  
  
  
  
  //Logica para la pagina y numero de items
  const order = [];
  const filter = {};
  let page = 1;
  let size = 10;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {page = pageAsNumber;}
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber <= 10) {size = sizeAsNumber;}

  // Ordenamiento 
  const sortMap = {
   nameAsc: ['name', 'ASC'],
   nameDesc: ['name', 'DESC'],
   availabilityAsc: ['availability', 'ASC'],
   availabilityDesc: ['availability', 'DESC'],
   price: ["price","ASC"],
   price: ["price", "DESC"],
   pages: ["pages","ASC"],
   pages: ["pages", "DESC"],
   reviews : ["reviews ","ASC"],
   reviews : ["reviews ", "DESC"],
   score: ["score","ASC"],
   score: ["score", "DESC"],
   publicationYear: ["year","ASC"],
   publicationYear: ["year", "DESC"],
   stock: ["stock","ASC"],
   stock: ["stock", "DESC"],
   timestamps: ["timestamps","ASC"],
   timestamps: ["timestamps", "DESC"],
  };
  // TODO: timestamps y chequear availability
  //TODO chequear filtros de arrays
try {
  
  if (query.order && sortMap[query.order]) {
    order.push(sortMap[query.order]);
  }

  // Filtros condicionales para géneros literarios y autores
  if (name) {filter.name = { [Op.iLike]: `%${name}%` };}
    // Si genre es un array de IDs, puedes convertirlo a un array de enteros
  if (genre) {
    const genreIds = genre.split(',').map(Number);
    filter.genre = genreIds;
  }
  // Si author es un array de IDs, puedes convertirlo a un array de enteros
  if (author) {
    const authorIds = author.split(',').map(Number);
    filter.author = authorIds;
  }

// Filtro rango precios
  if (priceMin && !Number.isNaN(priceMin)) {filter.sellPrice = { [Op.gte]: priceMin };}
  if (priceMax && !Number.isNaN(priceMax)) {filter.sellPrice = { ...filter.sellPrice, [Op.lte]: priceMax };}
// Filtro average Score
  if (averageScoreMin && !Number.isNaN(averageScoreMin)) {filter.averageScore = { [Op.gte]: averageScoreMin };}
  if (averageScoreMax && !Number.isNaN(averageScoreMax)) {filter.averageScore = { ...filter.averageScore, [Op.lte]: averageScoreMax };}
// Filtro cantidad de paginas
  if (pagesMin && !Number.isNaN(pagesMin)) {filter.pages = { [Op.gte]: pagesMin };}
  if (pagesMax && !Number.isNaN(pagesMax)) {filter.pages = { ...filter.pages, [Op.lte]: pagesMax };}
  
  if (availability) {filter.availability = availability === 'true';}

 const books = await Book.findAndCountAll({
   where: filter,
   order,
   limit: size,
   offset: (page - 1) * size,
 });
  return books;

} catch (error) {
  console.log(error)  
  }
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
  pages,
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
      pages: pages,
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
    pages,
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
  pages,
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
      pages,
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
