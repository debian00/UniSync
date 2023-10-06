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
  let genreIds = null
  let page = 1;
  let size = 10;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {page = pageAsNumber;}
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber <= 10) {size = sizeAsNumber;}

  // Ordenamiento 
  const sortMap = {
  // Ordenamiento user
   titleAsc: ['title', 'ASC'],
   titleDesc: ['title', 'DESC'],
   sellPriceAsc: ["sellPrice","ASC"],
   sellPriceDesc: ["sellPrice", "DESC"],
   pagesAsc: ["pages","ASC"],
   pagesDesc: ["pages", "DESC"],
   reviewsAsc : ["reviews ","ASC"],
   reviewsDesc : ["reviews ", "DESC"],
   averageScoreAsc: ["averageScore","ASC"],
   averageScoreDesc: ["averageScore", "DESC"],
   publicationYearAsc: ["year","ASC"],
   publicationYearDesc: ["year", "DESC"],

   //Ordenamiento Admin
   availabilityAsc: ['availability', 'ASC'],
   availabilityDesc: ['availability', 'DESC'],
   stockAsc: ["stock","ASC"],
   stockDesc: ["stock", "DESC"],
   createdAtAsc: ["createdAt","ASC"],
   createdAtDesc: ["createdAt", "DESC"],
  };

try {
  
  if (query.order && sortMap[query.order]) {
    order.push(sortMap[query.order]);
  }
  // Filtros condicionales para géneros literarios y autores
  if (title) {filter.title = { [Op.iLike]: `%${title}%` };}
  
 // recibo un solo numero de genre tengo que definirlo como array para pasar a sequelize
 // recibo multiples genres, lo spliteo en un array de num y paso a sequelize
  if (genre) {
    if(genre.length === 1){
      let genreNum = [Number(genre)]
      filter.genre = {[Op.contains]: genreNum};
    }
    else {
      genreIds = genre.split(',').map(Number);
      filter.genre = {[Op.contains]: [genreIds]};
    }
  }
  
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
   include: Review
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
      include: Review
    }
  })
  return book;
}

const getBookByIdController = async (id) => {
  const book = await Book.findOne({
    where: {
      id: id
    },
    include: Review
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
  stock,
  availability
) => {
// Id que voy a pasarle a la relacion
 let authorId = null

// Los siguientes condicionales de typeof son para evitar problemas de comunicacion con el front.
// En caso de que envien el id o el string, en caso de que envien el string del input, no pasa nada.
const authorsInDb = await Author.findAll()
let createInDbId= authorsInDb.length+1
 // Si recibo un autor desde el front como string
 if(typeof author == "string"){
      // Si recibo un libro sin autor, busco en DB un autor "Unknown" y asigno su id para la relacion 
       if(!author){
        const existentAuthor = await Author.findOne({where:{name:"Unknown"}})
        if(existentAuthor){authorId=existentAuthor.dataValues.id}
      // Si no existe el "unknown" en la DB, lo creo y asigno su id para la relacion
      // Esta funcion se ejecuta una unica vez hasta que se haga un force en la DB
        if(!existentAuthor){
          let newDBAuthor = await Author.create({id:createInDbId, name:"Unknown"})
          if(newDBAuthor) {authorId=newDBAuthor.dataValues.id}
        }}
      
      //Busco el autor y si no existe, lo creo
       if(author){const existentAuthor = await Author.findOne({where:{name:author}})
        if(existentAuthor){authorId=existentAuthor.dataValues.id}
        if(!existentAuthor){
          let newDBAuthor = await Author.create({id:createInDbId, name:author})
         if(newDBAuthor) {authorId=newDBAuthor.dataValues.id}
        }}}

      // Si recibo el autor como numero desde el front ejecuto esto
if(typeof author == "number"){
      const existentAuthor = await Author.findOne({where:{id:author}})
      if (existentAuthor){
        authorId=existentAuthor.dataValues.id
        author=existentAuthor.dataValues.name
      }
}
    
  const newBook = await Book.create({
    title,
    author,
    description,
    genre,
    publicationYear,
    images: [images],
    sellPrice,
    pages,
    stock,
    availability
  })
  for (let i = 0; i < genre.length; i++) {
    await newBook.addGenre(genre[i])
  }
  await newBook.setAuthor(authorId)
  //Las relaciones de autor no figuran en la tabla intermedia pero setea el userId del book
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

    const updateBook = await Book.findOne({ where: { id: id } });
    if (updateBook) {
      await updateBook.update({
        title: title,
        author: author,
        description: description,
        genre: genre,
        publicationYear: publicationYear,
        images: [images],
        sellPrice: sellPrice,
        pages: pages,
        stock: stock,
        availability : availability
      });
    }
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

// Controlador para poner un libro en oferta
const isForSaleController = async (id) => {
  try {
    const book = await Book.findOne({ where: { id: id } });

    if (!book) {
      throw new Error("Libro no encontrado");
    }

    await book.update({ forSale: true });

    return { success: true, message: "El libro se encuentra ahora en oferta." };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Controlador para retirar un libro de la oferta
const isNotForSaleController = async (id) => {
  try {
    const book = await Book.findOne({ where: { id: id } });

    if (!book) {
      throw new Error("Libro no encontrado");
    }

    await book.update({ forSale: false });

    return { success: true, message: "El libro ya no está en oferta." };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = {
  getAllBooksController,
  getBookByNameController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController,
  pauseBookController,
  restoreBookController,
  isForSaleController,
  isNotForSaleController
}
