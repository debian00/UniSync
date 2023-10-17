const { Router } = require('express')

const localLoginRouter = require('./loginRoutes/localLoginRouter')
const bookRouter = require("./modelRoutes/bookRouter");
const userRouter = require('./modelRoutes/userRouter')
const authorRouter = require('./modelRoutes/authorRouter')
const genreRouter = require('./modelRoutes/genreRouter')
const saleRouter = require('./modelRoutes/saleRouter');
const reviewRouter = require('./modelRoutes/reviewRouter');
const promoRouter = require('./paymentRoutes/promoRouter')
const stripeRouter = require('./paymentRoutes/stripeRouter')
const mercadoPagoRouter = require('./paymentRoutes/mercadoPagoRouter')
const forgotPassRouter = require('./loginRoutes/forgotPassRouter');
const resetPasswordRouter = require('./loginRoutes/resetPasswordRouter');
const cartRouter = require("./modelRoutes/cartRouter")
const favoriteRouter = require('./favoriteRoutes/favoriteRouter');
const invoiceRouter = require("./paymentRoutes/invoiceRouter")
const contactRouter = require('./contactenos/contactRouter')
const emailContact = require('./contactenos/email')
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
router.use('/pay/stripe', stripeRouter)
router.use('/pay/mercadoPago', mercadoPagoRouter)
router.use("/invoice", invoiceRouter)
//Rutas de recuperar contraseña
router.use('/forgot-password', forgotPassRouter)
router.use('/reset-password', resetPasswordRouter)
//Rutas de favorites
router.use("/favorites", favoriteRouter);

//Ruta de contactenos
router.use("/sendmail", emailContact);
router.use("/contact", contactRouter);


module.exports = router