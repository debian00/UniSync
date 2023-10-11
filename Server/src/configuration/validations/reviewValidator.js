// const { check } = require('express-validator');
// const { validateResult } = require('../../helpers/validateHelper');

// const validateCreate = [
//     check('score')
//         .exists()        
//         .isDecimal()
//         .withMessage("Debe ser un numero decimal")
//     ,
//     check('comment')
//         .isString()
//     ,
//     check('userId')
//         .exists()        
//         .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
//     ,
//     check('bookId')
//         .exists()        
//     //    .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
//     ,

//     (req, res, next) => {
//         validateResult(req, res, next)
//     }
// ]

// const validateUpdate = [ 
//     check('score')
//     .exists()    
//     .isDecimal()
//     .withMessage("Debe ser un numero decimal")
// ,
// check('comment')
//     .isString()
// ,

// check('bookId')
//     .exists()    
//     .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
// ,
//     (req, res, next) => {
//         validateResult(req, res, next)
//     }
// ]
// module.exports = {
//     validateCreate,
//     validateUpdate
// }