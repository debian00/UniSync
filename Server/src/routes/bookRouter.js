const { Router } = require("express");
const { 
  getAllBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  editBookHandler,
  deleteBookHandler
} = require("../handlers/bookHandler");


const bookRouter = Router();

bookRouter.get("/", getAllBooksHandler);

bookRouter.get("/:id", getBookByIdHandler);

bookRouter.post("/create", createBookHandler)

bookRouter.put("/edit/:id", editBookHandler)

bookRouter.delete("/delete/:id", deleteBookHandler)





module.exports = bookRouter;
