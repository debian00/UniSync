const {
    userAddFavorite,
    userRemoveFavorite,
    userAllFavorites
} = require("../controllers/favoriteController");

const updateFavoriteHandler = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        await userAddFavorite(userId,bookId);
        res.status(200).json("El libro se agregó a favoritos.")
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

const removeFavoriteHandler = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        await userRemoveFavorite(userId,bookId);
        res.status(200).json("El libro se eliminó de favoritos.")
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

const getAllFavoriteHandler = async (req, res) => {
    const {userId} = req.params
    try {
        const response = await userAllFavorites(userId);
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