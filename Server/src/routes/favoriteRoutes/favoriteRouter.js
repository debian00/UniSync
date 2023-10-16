const { Router } = require("express");
const {
    
   updateFavoriteHandler,
   removeFavoriteHandler,
   getAllFavoriteHandler
} = require("../../handlers/favoriteHandler");

const favoriteRouter = Router();

favoriteRouter.put("/like", updateFavoriteHandler);
favoriteRouter.put("/unlike", removeFavoriteHandler);
favoriteRouter.get("/:id", getAllFavoriteHandler);


module.exports = favoriteRouter;