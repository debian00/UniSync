const { Book, Author, Genre, Review } = require("../database/db");
const { Op } = require("sequelize");

const getAllBooksController = async (req) => {

  //Queries de page y size
  const { query } = req;
  const pageAsNumber = Number.parseInt(query.page);
  const sizeAsNumber = Number.parseInt(query.size);
  const {
    title,
    genre,
    author,
    sellPriceMin,
    sellPriceMax,
    pagesMin,
    pagesMax,
    averageScoreMin,
    averageScoreMax,
    stockMin,
    stockMax,
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
   titleAsc: ['title', 'ASC'],
   titleDesc: ['title', 'DESC'],
   availabilityAsc: ['availability', 'ASC'],
   availabilityDesc: ['availability', 'DESC'],
   sellPriceAsc: ["sellPrice","ASC"],
   sellPriceDesc: ["sellPrice", "DESC"],
   pagesAsc: ["pages","ASC"],
   pagesDesc: ["pages", "DESC"],
   reviewsAsc : ["reviews ","ASC"],
   reviewsDesc : ["reviews ", "DESC"],
   scoreAsc: ["score","ASC"],
   scoreDesc: ["score", "DESC"],
   publicationYearAsc: ["year","ASC"],
   publicationYearDesc: ["year", "DESC"],
   stockAsc: ["stock","ASC"],
   stockDesc: ["stock", "DESC"],
   //pendiente
   timestampsAsc: ["timestamps","ASC"],
   timestampsDesc: ["timestamps", "DESC"],
  };
  // TODO: timestamps

try {
  console.log(genre)
  console.log(genre.length === 1)
  console.log(typeof genre)
  if (query.order && sortMap[query.order]) {
    order.push(sortMap[query.order]);
  }
  // Filtros condicionales para géneros literarios y autores
  if (title) {filter.title = { [Op.iLike]: `%${title}%` };}
  // Si genre es un array de IDs, puedes convertirlo a un array de enteros
  let genreIds = null

  if (genre) {
    if(genre.length === 1){
      filter.genre = {[Op.is]:genre};
    }
    else {
      genreIds = genre.split(',').map(Number);
      filter.genre = {[Op.contains]: genreIds};
    }
  }
    console.log(genreIds)
    console.log(genreIds)
    console.log(filter.genre)
  
  if (author) {filter.author = { [Op.iLike]: `%${author}%` };}
  // Filtro rango precios
  if (sellPriceMin && !Number.isNaN(sellPriceMin)) {filter.sellPrice = { [Op.gte]: sellPriceMin };}
  if (sellPriceMax && !Number.isNaN(sellPriceMax)) {filter.sellPrice = { ...filter.sellPrice, [Op.lte]: sellPriceMax };}
  // Filtro average Score
  if (averageScoreMin && !Number.isNaN(averageScoreMin)) {filter.averageScore = { [Op.gte]: averageScoreMin };}
  if (averageScoreMax && !Number.isNaN(averageScoreMax)) {filter.averageScore = { ...filter.averageScore, [Op.lte]: averageScoreMax };}
  
  // Filtro cantidad de paginas
  if (pagesMin && !Number.isNaN(pagesMin)) {filter.pages = { [Op.gte]: pagesMin };}
  
  if (pagesMax && !Number.isNaN(pagesMax)) {filter.pages = { ...filter.pages, [Op.lte]: pagesMax };}
  // Filtro stock
  if (stockMin && !Number.isNaN(stockMin)) {filter.stock = { [Op.gte]: stockMin };}
  if (stockMax && !Number.isNaN(stockMax)) {filter.stock = { ...filter.stock, [Op.lte]: stockMax };}
  
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
  */
 let authorId = null
 if(author){const newAuthor = await Author.findOne({where:{name:author}})
    if(!newAuthor){
      let newDBAuthor = await Author.create({name:author})
      console.log(newDBAuthor)
      authorId=newDBAuthor.dataValues.id
  }
}
    console.log("----------------------------")
    console.log(title)
    console.log(author)
    console.log(description)
    console.log(genre)
    console.log(publicationYear)
    console.log(images)
    console.log(sellPrice)
    console.log(pages)
    console.log(stock)
    console.log("----------------------------")
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
    // Si se vendieron todos los libros y stock llega a 0, se pausa la publicacion
    // Si agrego stock, se reanuda
    if(stock && stock === 0){availability = false}
    if(stock && stock >=1){availability = true}

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
