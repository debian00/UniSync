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

authorRouter.get("/", getAllAuthorsHandler);
authorRouter.get("/", getAuthorByNameHandler);
authorRouter.get("/:id", getAuthorByIdHandler);
authorRouter.post("/create", createAuthorHandler);
authorRouter.put("/update", updateAuthorHandler);
authorRouter.delete("/delete/:id", deleteAuthorHandler);


module.exports = authorRouter;