const { Router } = require('express')

const localLoginRouter = require('./loginRoutes/localLoginRouter')
const bookRouter = require("./bookRouter");
const userRouter = require('./userRouter')
const authorRouter = require('./authorRouter')


const router = Router()

router.use('/login', localLoginRouter)
router.use('/users', userRouter)

router.use('/books', bookRouter)
router.use('/author',authorRouter )

module.exports = router