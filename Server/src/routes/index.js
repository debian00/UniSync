const { Router } = require('express')

const localLoginRouter = require('./loginRoutes/localLoginRouter')
const bookRouter = require("./bookRouter");
const userRouter = require('./userRouter')
const authorRouter = require('./authorRouter')
const genreRouter = require('./genreRouter')
const saleRouter = require('./saleRouter');

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
//Rutas de ventas
router.use('/sale',saleRouter)

module.exports = router