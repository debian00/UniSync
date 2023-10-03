const { User, Review } = require("../database/db");
const { Op } = require("sequelize");
const { encrypt } = require('../middlewares/hashPassword');
const { registerToken } = require('../middlewares/tokens/registerToken');


// Método para pausar
User.prototype.sleep = function () {
  return this.update({ hide: true });
};

// Método para restaurar
User.prototype.restore = function () {
  return this.update({ hide: false });
};


//Trae a todos los usuarios
const getAllUsersController = async () => {
  try {
    const allUsers = await User.findAll();
    return allUsers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Trae el usuario por email o nombre
const getUserByNameOrEmailController = async (nameOrEmail) => {
  try {
    const foundUsers = await User.findAll({
      where: {
        [Op.or]: [
          {
            userName: {
              [Op.iLike]: `%${nameOrEmail}%`,
            },
          },
          {
            email: {
              [Op.iLike]: `%${nameOrEmail}%`,
            },
          },
        ],
      },
    });
    return foundUsers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Trae un usuario por id
const getUsersByIdController = async (id) => {
  try {
    const userFound = await User.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "name",
        "userName",
        "profilePic",
        "birthDate",
        "phoneNumber",
        "email",
        "userType"
      ],
      include: Review
    });
    return userFound;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Crea un nuevo usuario en la db
const createUserController = async ({
  name,
  userName,
  profilePic,
  birthDate,
  phoneNumber,
  email,
  password
}) => {
  try {
    const [createdUser, created] = await User.findOrCreate({
      where: { userName },
      defaults: {
        name,
        profilePic,
        birthDate,
        phoneNumber,
        email,
        password,
      },
    });

    if (!created) {
      throw new Error(`El nombre de usuario ${userName} ya existe.`);
    }

    const registrationToken = await registerToken();

    return { success: true, data: createdUser, registrationToken };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Actualiza informacion de un usuario
const updateUserController = async ({
  name,
  userName,
  profilePic,
  phoneNumber,
  email,
  password,
  birthDate,
}) => {

  try {
    const updateUser = await User.findOne({
      where: { userName: userName },
    });

    if (!updateUser) {
      throw new Error(`Usuario con userName '${userName}' no encontrado.`);
    }

    if (password) {
      const hashedPassword = await encrypt(password);
      await updateUser.update({
        name,
        userName,
        profilePic,
        phoneNumber,
        email,
        password: hashedPassword,
        birthDate,
      });
    } else {
      await updateUser.update({
        name,
        profilePic,
        phoneNumber,
        email,
        birthDate,
      });
    }

    return updateUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Elimina un usuario permanentemente
const deleteUserController = async (id) => {
  try {
    const userDestroy = await User.findOne({
      where: {
        id: id,
      },
    });

    if (userDestroy) {
      await userDestroy.destroy();
      return "Usuario eliminado con éxito";
    } else {
      throw new Error("Usuario no encontrado con ID " + id);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Suspender un usuario temporalmente o "borrado logico"
const sleepUserByIdController = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("Usuario no encontrado");
    await user.sleep();
    return "Usuario pausado satisfactoriamente";
  } catch (error) {
    console.error("Error al pausar el usuario:", error.message);
    throw new Error("No se pudo pausar el usuario");
  }
};


//Restaurar un usuario suspendido
const restoreUserByIdController = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("Usuario no encontrado");
    await user.restore();
    return "Usuario restaurado satisfactoriamente";
  } catch (error) {
    console.error("Error al restaurar el usuario:", error.message);
    throw new Error("No se pudo restaurar el usuario");
  }
};


//Dar permisos de administrador
const allowAdminPermissionsController = async (id) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    if (user) {
      const newAdmin = await user.update({ userType: "admin" });
      return newAdmin;
    }
    throw new Error("Usuario no encontrado");
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Quitar permisos de administrador
const forbidAdminPermissionsController = async (id) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    if (user) {
      const newUser = await user.update({ userType: "user" });
      return newUser;
    }
    throw new Error("Usuario no encontrado");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByNameOrEmailController,
  getUsersByIdController,
  updateUserController,
  sleepUserByIdController,
  restoreUserByIdController,
  allowAdminPermissionsController,
  forbidAdminPermissionsController
};
