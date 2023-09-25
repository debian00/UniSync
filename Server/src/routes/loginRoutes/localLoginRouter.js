const { Router } = require('express')
const { localLogin } = require('../../configuration/login/localLogin')

const localLoginRouter = Router()

localLoginRouter.post('/', localLogin)

module.exports = localLoginRouter