const { Router } = require('express')

const localLoginRouter = require('./loginRoutes/localLoginRouter')

const router = Router()

router.use('/login', localLoginRouter)

module.exports = router