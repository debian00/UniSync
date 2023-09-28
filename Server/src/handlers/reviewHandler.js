const {
    getAllReviewsController,
    getReviewByIdController,
    createReviewController,
    updateReviewController,
    deleteReviewController
} = require("../controllers/reviewControllers");

//Trae todas las reviews
const getAllReviewsHandler = async (req, res) => {
    try {
      const response = await getAllReviewsController()
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(400).json('Error al traer todas las reviews')
    }
}
//Trae las reviews por id
const getReviewByIdHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getReviewByIdController(id)
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(404).json('Review no encontrada por Id');
    }
};
//Crea una review
const createReviewHandler = async (req, res) => {
    const {
        score,
        comment,
        userId,
        bookId
    } = req.body
    try {
        const response = await createReviewController({
            score,
            comment,
            userId,
            bookId
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json("Error en la creacion de la review")
    }
};
// Modifica datos de una review (Quité userId, porque en una edicion de la review no se deberia poder modificar el usuario que lo modifica)
const updateReviewHandler = async (req, res) => {
    const { id } = req.params
    const { 
        score,
        comment,
        bookId
     } = req.body
    try {
        const modifiedReview = await updateReviewController({
            score,
            comment,
            bookId
        })
      res.status(200).json(modifiedReview)
    } catch (error) {
      console.log(error)
      res.status(400).json('No se pudo actualizar la review')
    }
  }
//Borra una review
const deleteReviewHandler = async (req, res) => {
    const {id} = req.params
    try {
      const response = await deleteReviewController(id)
      res.status(204).json(response)
    } catch (error) {
      console.log(error)
      res.status(404).json(` La review cuyo id es:  ${id} no se pudo borrar`)
    }
  }
module.exports = {
    getAllReviewsHandler,
    getReviewByIdHandler,
    createReviewHandler,
    updateReviewHandler,
    deleteReviewHandler
}