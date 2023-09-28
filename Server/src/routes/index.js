const { Router } = require('express')

const localLoginRouter = require('./loginRoutes/localLoginRouter')
const bookRouter = require("./bookRouter");
const userRouter = require('./userRouter')
const authorRouter = require('./authorRouter')
const genreRouter = require('./genreRouter')

const router = Router()

//Ruta de inicio de sesión local
router.use('/login', localLoginRouter)
//Rutas de usuarios
router.use('/users', userRouter)

//Rutas de libros
router.use('/books', bookRouter)
//Ruras de autores
router.use('/author', authorRouter)
//Rutas de géneros
router.use('/genre', genreRouter)

module.exports = router