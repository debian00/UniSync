const {
  getAllAuthorsController,
  getAuthorByNameController,
  getAuthorByIdController,
  updateAuthorController,
  createAuthorController,
  deleteAuthorController
} = require('../controllers/authorController')


// Trae todos los autores
const getAllAuthorsHandler = async (req, res) => {
  try {
    const response = await getAllAuthorsController()
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(400).json('Error al traer los autores')
  }
}


//Trae autores por nombre
const getAuthorByNameHandler = async (req, res) => {
  const { name } = req.query
  try {
    const response = await getAuthorByNameController(name)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(404).json('No existe un autor con ese nombre')
  }
}


//Trae autores por id
const getAuthorByIdHandler = async (req, res) => {
  const { id } = req.params
  try {
    const response = await getAuthorByIdController(id)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(404).json('No existe un autor con ese id')
  }
}


//Modifica el nombre del autor
const updateAuthorHandler = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const newName = await updateAuthorController({ id, name })
    res.status(200).json(newName)
  } catch (error) {
    console.log(error)
    res.status(400).json('No se pudo actualizar el nombre del autor')
  }
}


//Crea un nuevo autor
const createAuthorHandler = async (req, res) => {
  const { name } = req.body
  try {
    const response = await createAuthorController({ name })
    res.status(201).json(response)
  } catch (error) {
    console.log(error)
    res.status(422).json('No se pudo crear el autor')
  }
}


//Borra un autor
const deleteAuthorHandler = async (req, res) => {
  const {id} = req.params
  try {
    const response = await deleteAuthorController(id)
    res.status(204).json(response)
  } catch (error) {
    console.log(error)
    res.status(404).json(`Autor ${id} no ha podido ser vaporizado`)
  }
}

module.exports = {
  createAuthorHandler,
  deleteAuthorHandler,
  getAuthorByNameHandler,
  getAllAuthorsHandler,
  getAuthorByIdHandler,
  updateAuthorHandler
}