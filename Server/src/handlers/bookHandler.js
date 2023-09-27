const {getAllBooks,getBookByName, getBookById} = require("../controllers/bookControllers");


const getAllBooksHandler = async (req, res) => {
    const { name } = req.query;
       
    try {
        const response = name ? await getBookByName(name) : await getAllBooks();
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json("No se encontró ningun libro con ese nombre");
    }
}

const getBookByIdHandler = async (req, res) => {
    const { id } = req.params;
       
    try {
        const response =  await getBookById(id) 
        res.status(200).json(response); 
    } catch (error) {
        res.status(404).json("Libro no encontrado por Id");
    }
}
const createBookHandler = async (req,res) => {
    const {
        title,
        author,
        description,
        gender,
        publicationYear,
        images,
        sellPrice,
    } = req.body
    try {
        const response = await createBook(
            title,
            author,
            description,
            gender,
            publicationYear,
            images,
            sellPrice    
        )
    res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json("Error en la creacion del libro")
    }
}

const editBookHandler = async (req,res) => {
    const { id } =req.params
    const {
        title,
        author,
        description,
        gender,
        publicationYear,
        images,
        sellPrice,
        stock,
        availability
    } = req.body
    try {
    const response = await editBook(
        id,
        title,
        author,
        description,
        gender,
        publicationYear,
        images,
        sellPrice,
        stock,
        availability
    )
    } catch (error) {
        console.log(error)
        res.status(400).json("Error editando el libro")
    }
}

const deleteBookHandler = async (req,res) => {
    const { id } = req.params
    try {
    await deleteBook(id)
    res.status(200).json("Libro eliminado correctamente")
    } catch (error) {
        console.log(error)
        res.status(400).json("No se puede eliminar el libro")
    }
}

module.exports = {
    getAllBooksHandler,
    getBookByIdHandler,
    createBookHandler,
    editBookHandler,
    deleteBookHandler
}