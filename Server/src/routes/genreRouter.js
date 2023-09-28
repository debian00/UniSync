const { Router } = require("express");
const {
  createGenreHandler,
  deleteGenreHandler,
  getGenreByNameHandler,
  getAllGenresHandler,
  getGenreByIdHandler,
} = require('../handlers/genreHandler')

const genreRouter = Router();

//Trae todos los géneros
genreRouter.get('/', getAllGenresHandler)
//Trae un género por nombre
genreRouter.get('/', getGenreByNameHandler)
//Trae un género por id
genreRouter.get('/:id', getGenreByIdHandler)
//Crea un nuevo género
genreRouter.post('/create', createGenreHandler)
//Elimina un género
genreRouter.delete('/delete', deleteGenreHandler)

module.exports = genreRouter;