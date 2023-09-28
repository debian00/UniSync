const { Router } = require("express");
const { 
  getAllBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  editBookHandler,
  deleteBookHandler,
  pauseBookHandler,
  restoreBookHandler

} = require("../handlers/bookHandler");


const bookRouter = Router();

bookRouter.get("/", getAllBooksHandler);

bookRouter.get("/:id", getBookByIdHandler);

bookRouter.post("/create", createBookHandler)

bookRouter.put("/edit/:id", editBookHandler)

bookRouter.delete("/delete/:id", deleteBookHandler)

bookRouter.get("/pause/:id", pauseBookHandler)

bookRouter.get("/restore/:id", restoreBookHandler)




module.exports = bookRouter;
