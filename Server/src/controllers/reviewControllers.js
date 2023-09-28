const { Review } = require("../database/db");
const { Op } = require("sequelize");

//Trae todas las reviews
const getAllReviewsController = async () => {
    try {
        const reviews = await Review.findAll();
        return reviews;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//Trae una review por Id
const getReviewByIdController = async (id) => {
    try {
        const review = await Review.findOne({
            where: {
                id: id,
            },
        });
        return review;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//Crea una nueva review
const createReviewController = async ({
    score,
    comment,
    userId,
    bookId
}) => {
    try {
        const newReview = await Review.create({
            score,
            comment,
            userId,
            bookId
        });
        return newReview;
        
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//Modifica una review
const updateReviewController = async (id,
    {
        score,
        comment,
        bookId
    }) => {
    const reviewToUpdate = await Review.findByPk(id);
    try {
        const updatedReview = await reviewToUpdate.update({
            score,
            comment,
            bookId
         });
  
        return updatedReview;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//Elimina una review
const deleteReviewController = async (id) => {
    try {
      const reviewToDelete = await Review.findOne({
        where: {
          id: id
        }
      });
  
      if (reviewToDelete) {
        await reviewToDelete.destroy(); 
        return "Review eliminada con éxito";
      } else {
        throw new Error("Review no encontrada con ID " + id);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
};
  
module.exports = {
    getAllReviewsController,
    getReviewByIdController,
    createReviewController,
    updateReviewController,
    deleteReviewController
}