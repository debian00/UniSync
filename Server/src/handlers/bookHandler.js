const {
    getAllBooksController,
    getBookByNameController,
    getBookByIdController,
    createBookController,
    updateBookController,
    deleteBookController,
    pauseBookController,
    restoreBookController
} = require("../controllers/bookControllers");


const getAllBooksHandler = async (req, res) => {

    try {
        const response = await getAllBooksController(req);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json("Error al traer los libros");
    }
}

const getBookByNameHandler = async (req, res) => {
    const { title } = req.query
    try {
        const response = await getBookByNameController(title)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json("Libro no pudo ser localizado")
    }
}

const getBookByIdHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getBookByIdController(id)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json("Libro no encontrado por Id");
    }
}
const createBookHandler = async (req, res) => {
    const {
        title,
        author,
        description,
        genre,
        publicationYear,
        images,
        sellPrice,
        pages,
        stock
    } = req.body
    try {
        const response = await createBookController(
            title,
            author,
            description,
            genre,
            publicationYear,
            images,
            sellPrice,
            pages,
            stock
        )
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json("Error en la creacion del libro")
    }
}

const updateBookHandler = async (req, res) => {
    const { id } = req.params
    const {
        title,
        author,
        description,
        genre,
        publicationYear,
        images,
        sellPrice,
        pages,
        stock,
        availability
    } = req.body
    try {
        const response = await updateBookController(
            id,
            title,
            author,
            description,
            genre,
            publicationYear,
            images,
            sellPrice,
            pages,
            stock,
            availability
        )
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json("Error editando el libro")
    }
}

const deleteBookHandler = async (req, res) => {
    const { id } = req.params
    try {
        await deleteBookController(id)
        res.status(200).json("Libro eliminado correctamente")
    } catch (error) {
        console.log(error)
        res.status(400).json("No se puede eliminar el libro")
    }
}

const pauseBookHandler = async (req, res) => {
    const { id } = req.params
    try {
        await pauseBookController(id)
        res.status(200).json("Exito suspendiendo la publicacion, ahora el libro esta almacenado en las sombras")
    } catch (error) {
        console.log(error)
        res.status(400).json("No se pudo pausar la publicacion")
    }
}
const restoreBookHandler = async (req, res) => {
    const { id } = req.params
    try {
        await restoreBookController(id)
        res.status(200).json("Exito reanudando la publicacion, el libro vuelve a ver la luz del dia")
    } catch (error) {
        console.log(error)
        res.status(400).json("No se pudo restaurar la publicacion")
    }
}

module.exports = {
    getAllBooksHandler,
    getBookByIdHandler,
    createBookHandler,
    updateBookHandler,
    deleteBookHandler,
    pauseBookHandler,
    restoreBookHandler,
    getBookByNameHandler
}