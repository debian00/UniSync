const {Router} = require('express')
const {createContact, deleteContact, getAllContacts} = require('../../handlers/contactHandler')

const contactRouter = Router()

contactRouter.get('/', getAllContacts)
//Permite iniciar sesion
contactRouter.post('/', createContact)

//Permite registrar una cuenta nueva
contactRouter.delete('/:id', deleteContact)

module.exports = contactRouter