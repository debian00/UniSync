const {
    userAddFavoriteController,
    userRemoveFavoriteController,
    userAllFavoritesController
} = require("../controllers/favoriteController");

const updateFavoriteHandler = async (req, res) => {
    const { userId, bookId } = req.body;
    console.log(userId, bookId);
    try {
        await userAddFavoriteController(userId,bookId);
        res.status(200).json("El libro se agregó a favoritos.")
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

const removeFavoriteHandler = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        await userRemoveFavoriteController(userId,bookId);
        res.status(200).json("El libro se eliminó de favoritos.")
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

const getAllFavoriteHandler = async (req, res) => {
    const {id} = req.params
    try {
        console.log(id)
        const response = await userAllFavoritesController(id);
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    updateFavoriteHandler,
    removeFavoriteHandler,
    getAllFavoriteHandler
}