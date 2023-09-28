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
        stock
    } = req.body
    try {
        const response = await createBook(
            title,
            author,
            description,
            gender,
            publicationYear,
            images,
            sellPrice,
            stock    
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
    res.status(200).json(response)
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

const pauseBookHandler = async (req,res) =>{
    const { id } = req.params
    try {
    await pauseBook(id)
    res.status(200).json("Exito suspendiendo la publicacion, ahora el libro esta almacenado en las sombras")
    } catch (error) {
        console.log(error)
        res.status(400).json("No se pudo pausar la publicacion")
    }
}
const restoreBookHandler= async (req,res) =>{
    const { id } = req.params
    try {
    await restoreBook(id)
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
    editBookHandler,
    deleteBookHandler,
    pauseBookHandler,
    restoreBookHandler
}