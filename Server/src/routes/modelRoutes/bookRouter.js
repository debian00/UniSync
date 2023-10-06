const { Router } = require("express");
const { 
  getAllBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
  pauseBookHandler,
  restoreBookHandler,
  getBookByNameHandler,
  isForSaleHandler,
  isNotForSaleHandler
} = require("../../handlers/bookHandler");


const bookRouter = Router();

bookRouter.get("/", getAllBooksHandler);

bookRouter.get("/search", getBookByNameHandler);

bookRouter.get("/:id", getBookByIdHandler);

bookRouter.post("/create", createBookHandler)

bookRouter.put("/update/:id", updateBookHandler)

bookRouter.delete("/delete/:id", deleteBookHandler)

bookRouter.get("/pause/:id", pauseBookHandler)

bookRouter.get("/restore/:id", restoreBookHandler)

bookRouter.patch("/forSale/:id", isForSaleHandler)

bookRouter.patch("/fullPrice/:id", isNotForSaleHandler)




module.exports = bookRouter;
