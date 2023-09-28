const { Router } = require("express");
const { 
  createUserHandler, 
  deleteUserHandler, 
  getAllUsersHandler, 
  getUserByNameOrEmailHandler, 
  getUsersByIdHandler, 
  updateUserHandler,
  restoreUserByIdHandler,
  sleepUserByIdHandler
} = require("../handlers/userHandlers");

const userRouter = Router();

//Traer todos los usuarios
userRouter.get("/", getAllUsersHandler); 
//Traer un usuario por su nombre o email
userRouter.get("/", getUserByNameOrEmailHandler);
//Traer un usuario por id
userRouter.get("/:id", getUsersByIdHandler);
//Crear usuario nuevo
userRouter.post("/create", createUserHandler);
//Actualizar datos de un usuario existente
userRouter.put("/update", updateUserHandler);
//Eliminar usuario
userRouter.delete("/delete/:id", deleteUserHandler);
// Suspender usuario
userRouter.patch("/sleep/:id", sleepUserByIdHandler);
// Restaurar usuario
userRouter.patch("/restore/:id", restoreUserByIdHandler);


module.exports = userRouter;
