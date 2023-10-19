const { Book, User} = require("../database/db");

const userAddFavoriteController = async (userId, bookId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const book = await Book.findByPk(bookId);
        if (!book) {
            throw new Error("Libro no encontrado");
        }

        // Verifica que user.favorites no sea null antes de usar includes
        if (user.favorites && user.favorites.includes(bookId)) {
            throw new Error("El libro ya está entre los favoritos del usuario");
        }

        const newFavorite = [...(user.favorites || []), book.id];
        await user.update({ favorites: newFavorite });
        return "Actualizado exitosamente";
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const userRemoveFavoriteController = async (userId, bookId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
       
        const favoriteIndex = user.favorites.indexOf(bookId);
        if (favoriteIndex === -1) {
            throw new Error("El libro no está en la lista de favoritos del usuario.");
        }

        const newFavorites = [...user.favorites];
        newFavorites.splice(favoriteIndex, 1);

        await user.update({ favorites: newFavorites });
        return "Eliminado exitosamente de la lista de favoritos.";
    } catch (error) {
        console.log(error);
        throw error;
    }
};


const userAllFavoritesController = async (id) => {
    try {
        const user = await User.findByPk(id)
        if(!user){ throw new Error("Usuario no encontrado") }

        const favs = await Book.findAll({where:{id:user.favorites}})
        return favs
        
        // return user.favorites
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    userAddFavoriteController,
    userRemoveFavoriteController,
    userAllFavoritesController
}