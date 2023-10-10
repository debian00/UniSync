const { User } = require('../database/models/users');
const { Book } = require('../database/models/books');

 const userAddFavorite = async (userId, bookId) => {
    try {
        const user = await User.findByPk(userId);
        if(!user){ throw new Error ("Usuario no encontrado")}
        const asset = await Book.findByPk(bookId);
        if(!asset){ throw new Error ("Libro no encontrada")}
    
        const newFavorite = [...user.favorites];
        newFavorite.push(bookId);
    
        await User.update({favorites : newFavorite})
        return "Updated succesfuly"
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const userRemoveFavorite = async (userId, bookId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const favoriteIndex = user.favorites.indexOf(bookId);
        if (favoriteIndex === -1) {
            return "El libro no está en la lista de favoritos del usuario.";
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


const userAllFavorites = async (userId) => {
    try {
        const {user} = User.findByPk(userId)
        if(!user){ throw new Error("Usuario no encontrado") }
        return user.favorites
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    userAddFavorite,
    userRemoveFavorite,
    userAllFavorites
}