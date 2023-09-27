const { Router } = require("express");
const { 
  createUserHandler, 
  deleteUserHandler, 
  getAllUsersHandler, 
  getUserByNameOrEmailHandler, 
  getUsersByIdHandler, 
  updateUserHandler 
} = require("../handlers/userHandlers");


const userRouter = Router();

userRouter.get("/", getAllUsersHandler);
userRouter.get("/", getUserByNameOrEmailHandler);
userRouter.get("/:id", getUsersByIdHandler);
userRouter.post("/create", createUserHandler);
userRouter.put("/update", updateUserHandler);
userRouter.delete("/delete/:id", deleteUserHandler);


module.exports = userRouter;
