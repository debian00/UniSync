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

module.exports = {
    getAllBooksHandler,
    getBookByIdHandler
}