const {
  createGenreController,
  deleteGenreController,
  getAllGenresController,
  getGenreByIdController,
  getGenreByNameController
} = require('../controllers/genreController')



// Trae todos los géneros
const getAllGenresHandler = async (req, res) => {
  try {
    const response = await getAllGenresController()
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(400).json('Error al traer los géneros')
  }
}


//Trae géneros por nombre
const getGenreByNameHandler = async (req, res) => {
  const { name } = req.query
  try {
    const response = await getGenreByNameController(name)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(404).json('No existe un género con ese nombre')
  }
}


//Trae generos por id
const getGenreByIdHandler = async (req, res) => {
  const { id } = req.params
  try {
    const response = await getGenreByIdController(id)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(404).json('No existe un género con ese id')
  }
}


//Crea un nuevo autor
const createGenreHandler = async (req, res) => {
  const { name } = req.body
  try {
    const response = createGenreController({ name })
    res.status(201).json(response)
  } catch (error) {
    console.log(error)
    res.status(400).json('No se pudo crear el género')
  }
}


//Borra un usuario
const deleteGenreHandler = async (req, res) => {
  const {id} = req.params
  try {
    const response = deleteGenreController(id)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(404).json(`Género ${id} no ha podido ser vaporizado`)
  }
}

module.exports = {
  createGenreHandler,
  deleteGenreHandler,
  getGenreByNameHandler,
  getAllGenresHandler,
  getGenreByIdHandler,
}