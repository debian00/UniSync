const { Router } = require("express");
const { getAllBooksHandler, getBookByIdHandler} = require("../handlers/bookHandler");


const bookRouter = Router();

bookRouter.get("/", getAllBooksHandler);

bookRouter.get("/:id", getBookByIdHandler);







module.exports = bookRouter;
