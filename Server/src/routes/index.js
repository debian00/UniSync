const { Router } = require('express')

const localLoginRouter = require('./loginRoutes/localLoginRouter')
const bookRouter = require("./bookRouter");


const router = Router()

router.use('/login', localLoginRouter)
router.use('/books', bookRouter)

module.exports = router