const { encrypt } = require('../middlewares/hashPassword')

const {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByNameOrEmailController,
  getUsersByIdController,
  updateUserController,
  restoreUserByIdController,
  sleepUserByIdController
} = require('../controllers/userControllers')


//Trae a todos los usuarios
const getAllUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsersController()
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(400).json('Error al traer los usuarios')
  }
}

//Trae el usuario por email o nombre
const getUserByNameOrEmailHandler = async (req, res) => {
  const { name, email } = req.query;
  try {
    if (!name && !email) {
      return res.status(400).json('Se requiere al menos un parámetro de búsqueda (name o email).');
    }

    const response = await getUserByNameOrEmailController(name || email);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json('Error al traer el usuario');
  }
}

//Trae un usuario por id
const getUsersByIdHandler = async (req, res) => {
  const { id } = req.params
  try {
    const response = await getUsersByIdController(id)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(404).json(`No encontrado el usuario con id ${id}`)
  }
}


//Crea un nuevo usuario en la db
const createUserHandler = async (req, res) => {
  const {
    name,
    userName,
    profilePic,
    birthDate,
    phoneNumber,
    email,
    password
  } = req.body
  try {
    const passwordHash = await encrypt(password)
    const userCreated = await createUserController({
      name,
      userName,
      profilePic,
      birthDate,
      phoneNumber,
      email,
      password: passwordHash
    })
    res.status(201).json(userCreated)
  } catch (error) {
    console.log(error)
    res.status(422).json("Error al crear usuario")
  }
}


//Actualiza informacion de un usuario
const updateUserHandler = async (req, res) => {
  const {id} = req.params
  const {
    name,
    profilePic,
    phoneNumber,
    email,
    password,
    birthDate,
  } = req.body
  try {
    const updatedUser = await updateUserController({
      id,
      name,
      profilePic,
      birthDate,
      phoneNumber,
      email,
      password
    })
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    res.status(400).json("Problemas al actualizar datos de cuenta")
  }
}


//Elimina un usuario permanentemente
const deleteUserHandler = async (req, res) => {
  const { id } = req.params
  try {
    const response = await deleteUserController(id)
    res.status(204).json(response)
  } catch (error) {
    console.log(error)
    res.status(404).json(`Usuario ${id} no ha posido ser vaporizado`)
  }
}


//Suspender un usuario temporalmente o "borrado logico"
const sleepUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await sleepUserByIdController(id);
    res.status(204).json(`Usuario suspendido con éxito: ${response}`);
  } catch (error) {
    console.error(error);
    res.status(400).json(`No se pudo suspender el usuario: ${error.message}`);
  }
}


//Restaurar un usuario suspendido
const restoreUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await restoreUserByIdController(id);
    res.status(204).json(`Usuario restaurado con éxito: ${response}`);
  } catch (error) {
    console.error(error);
    res.status(400).json(`No se pudo restaurar el usuario: ${error.message}`);
  }
}

module.exports = {
  getAllUsersHandler,
  getUserByNameOrEmailHandler, 
  getUsersByIdHandler,
  createUserHandler,
  updateUserHandler, 
  deleteUserHandler,
  sleepUserByIdHandler,
  restoreUserByIdHandler
}