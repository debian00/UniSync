const { check } = require('express-validator');
const { validateResult } = require('../../helpers/validateHelper');

const validateCreate = [ 
    check('name')
        .isString()
        .custom((value, { req }) => {
            //name
            if (value.length > 25) {
                throw new Error('El nombre debe ser menor a 25')
            }
            return true    
        })
    ,
    check('userName')
        .exists()
        .isString()
    ,
    check('profilePic')
        .isString()
    ,
    check('birthDate')
    .matches(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/)
    ,
    check('phoneNumber')
        .isString()
    ,
    check('email')        
        .isEmail()
        .withMessage("El mail es incorrecto")
    ,
    check('password')
        .isString()
    ,

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdate = [ 
    check('name')
        .isString()
        .custom((value, { req }) => {
            //name
            if (value.length > 25) {
                throw new Error('El nombre debe ser menor a 25')
            }
            return true    
        })
    ,
    check('userName')
        .exists()
        .isString()
    ,
    check('profilePic')
        .isString()
    ,
    check('birthDate')
    .matches(/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/)
    ,
    check('phoneNumber')
        .isString()
    ,
    check('email')        
        .isEmail()
        .withMessage("El mail es incorrecto")
    ,
    check('password')
        .isString()
    ,

    (req, res, next) => {
        validateResult(req, res, next)
    }
]
module.exports = {
    validateCreate,
    validateUpdate
}