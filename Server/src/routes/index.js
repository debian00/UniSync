const { Router } = require('express')

const localLoginRouter = require('./loginRoutes/localLoginRouter')
const bookRouter = require("./bookRouter");
const userRouter = require('./userRouter')
const authorRouter = require('./authorRouter')
const genreRouter = require('./genreRouter')
const saleRouter = require('./saleRouter');
const reviewRouter = require('./reviewRouter');
const promoRouter = require('./promoRouter')
const stripeRouter = require('./paymentRoutes/stripeRouter')
const forgotPassRouter = require('./forgotPassRouter');
const resetPasswordRouter = require('./resetPasswordRouter');
const cartRouter = require ("./cartRouter")
const router = Router()


//Ruta de inicio de sesión local
router.use('/login', localLoginRouter)
//Rutas de usuarios
router.use('/users', userRouter)
//Rutas de libros
router.use('/books', bookRouter)
//Rutas de autores
router.use('/author', authorRouter)
//Rutas de géneros
router.use('/genre', genreRouter)
//Rutas de ventas
router.use('/sale', saleRouter)
//Rutas de reviews
router.use('/review',reviewRouter)
//Ruta enviar promocion
router.use('/sendmail', promoRouter)
//Ruta de cart
router.use('/cart', cartRouter)

//Rutas de pago
router.use('/payment', stripeRouter)
//Rutas de recuperar contraseña
router.use('/forgot-password', forgotPassRouter)
router.use('/reset-password', resetPasswordRouter)


module.exports = router