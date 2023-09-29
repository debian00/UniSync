const { Router } = require("express");
const { 
  createUserHandler, 
  deleteUserHandler, 
  getAllUsersHandler, 
  getUserByNameOrEmailHandler, 
  getUsersByIdHandler, 
  updateUserHandler,
  restoreUserByIdHandler,
  sleepUserByIdHandler,
  allowAdminPermissionsHandler,
  forbidAdminPermissionsHandler
} = require("../handlers/userHandlers");

const userRouter = Router();

//Traer todos los usuarios
userRouter.get("/", getAllUsersHandler); 
//Traer un usuario por su nombre o email
userRouter.get("/search", getUserByNameOrEmailHandler);
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
//Dar permisos de administrador
userRouter.patch("/admin/:id", allowAdminPermissionsHandler)
//Quitar permisos de administrador
userRouter.patch("/noadmin/:id", forbidAdminPermissionsHandler)


module.exports = userRouter;
