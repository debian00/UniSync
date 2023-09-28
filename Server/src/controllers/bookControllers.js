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

const createBookController = async (
  title,
  author,
  description,
  gender,
  publicationYear,
  images,
  sellPrice,
  stock
  )=>{
    /*
    Ya que no tenemos nombre unico para publicar un libro
    validamos que no exista un libro que cuente con los
    siguientes campos iguales a uno ya creado, asi evitamos
    duplicados
    */
  const book = await Book.findOne({
    where :{
    title : title,
    author : author,
    gender : gender,
    publicationYear : publicationYear,
  }})
if(book){return "Libro existente"}
  const newBook = await Book.create(
      title,
      author,
      description,
      gender,
      publicationYear,
      images,
      sellPrice,
      stock
  )
  return newBook
  }
const updateBookController = async (
  id,
  title,
  author,
  description,
  gender,
  publicationYear,
  images,
  sellPrice,
  stock,
  availability
)=>{
try {
  const updateBook = await Book.findOne({where:{id:id}})
  await updateBook.update(
      title,
      author,
      description,
      gender,
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

const deleteBookController = async(id)=>{
  try {
    await Book.destroy({where:{id:id}})
    return "Se quema la biblioteca de alejandria! Libro destruido con exito."
  } catch (error) {
    console.log(error)
  }
}
const pauseBookController = async (id) => {
try {
  const book = await Book.findOne({where: {id:id}})
  if(book){
  await book.update({availability : false})
  return "Editado con exito"}
  return "Libro no encontrado"
} catch (error) {
  console.log(error)
}}

const restoreBookController = async (id) => {
  try {
  const book = await Book.findOne({where: {id:id}})
  if(book){
  await book.update({availability : true})
  return "Editado con exito"}
  return "Libro no encontrado"
} catch (error) {
  console.log(error)
}}

module.exports = {
    getAllBooks,
    getBookById,
    getBookByName,
    createBookController,
    updateBookController,
    deleteBookController,
    pauseBookController,
    restoreBookController
}
