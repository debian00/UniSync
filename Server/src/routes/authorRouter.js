const { Router } = require("express");
const {
  createAuthorHandler,
  deleteAuthorHandler,
  getAuthorByNameHandler,
  getAllAuthorsHandler,
  getAuthorByIdHandler,
  updateAuthorHandler
} = require("../handlers/authorHandler");

const authorRouter = Router();

// Traer todos los autores
authorRouter.get("/", getAllAuthorsHandler);
// Traer un autor por nombre
authorRouter.get("/", getAuthorByNameHandler);
// Traer un autor por ID
authorRouter.get("/:id", getAuthorByIdHandler);
// Crear un nuevo autor
authorRouter.post("/create", createAuthorHandler);
// Actualizar datos de un autor existente
authorRouter.put("/update/:id", updateAuthorHandler);
// Eliminar un autor
authorRouter.delete("/delete/:id", deleteAuthorHandler);

module.exports = authorRouter;