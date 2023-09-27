const { Router } = require('express')

const localLoginRouter = require('./loginRoutes/localLoginRouter')
const bookRouter = require("./bookRouter");
const userRouter = require('./userRouter')


const router = Router()

router.use('/login', localLoginRouter)
router.use('/books', bookRouter)
router.use('/users', userRouter)

module.exports = router