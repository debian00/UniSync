const { Book, User, Review } = require("../database/db");
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
//Crea una nueva review, edita el average del book y agrega relaciones
const createReviewController = async ({
    score,
    comment,
    userId,
    bookId
}) => {
    try {
//! Creo mi review
        const newReview = await Review.create({
            score,
            comment,
            userId,
            bookId
        });
//! Edito averageScore y numberOfReviews en el libro
        const reviewedBook = await Book.findByPk(bookId)
        let { averageScore, numberOfReviews } = reviewedBook;
        //Al ser float, esta trayendo averageScore como string 
        averageScore = Number(averageScore)
        //Si no tengo ninguna review, el average es igual al score
        if(averageScore===0){averageScore = averageScore + score}
        //Si tengo un average por reviews anteriores, actualizo el promedio
        if(averageScore > 0){ 
            let totalScore = (averageScore * numberOfReviews) + score
            averageScore = totalScore / (numberOfReviews + 1);
        }
        //Aumento el numero de reviews
        numberOfReviews = numberOfReviews + 1
        //Actualizo los datos del book
        await reviewedBook.update({averageScore,numberOfReviews})
        
//! Relaciones
        const user= await User.findByPk(userId)
        user.addReview(newReview)
        reviewedBook.addReview(newReview)
        //Linea experimental
        await newReview.reload()
      //NewReview incluye 2 valores null que son los id de relaciones
      //Por algun motivo en este return figura asi pero si hacemos una
      //peticion get al id de la review, figura correctamente
        return newReview;
} catch (error) {
        console.error(error);
        throw error;
    }
};

//Modifica una review

const updateReviewController = async (
    id,
    {
        score,
        comment,
        bookId
    }) => {
        try {
        const reviewToUpdate = await Review.findByPk(id);
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

const bookReviewController = async (id) =>{
try {
    const bookReviews = await Review.findAll({where:{bookId : id}})
    return bookReviews
} catch (error) {
    console.log(error)
    throw error
}
}
  
module.exports = {
    getAllReviewsController,
    getReviewByIdController,
    createReviewController,
    updateReviewController,
    deleteReviewController,
    bookReviewController
}