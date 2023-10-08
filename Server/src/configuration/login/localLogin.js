const { compare } = require('../../middlewares/hashPassword')
const { loginToken } = require('../../middlewares/tokens/loginToken')
const { User } = require('../../database/db')

const localLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ success: false, msg: 'Correo electrónico no válido' });
    }

    const isPasswordValid = await compare(password, user.password);

    if (isPasswordValid) {
      const tokenSession = await loginToken(user);
      res.status(200).json({ success: true, data: user, token: tokenSession });

      req.session.user = user
      
    } else {
      res.status(401).json({ success: false, msg: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error('Error en el controlador de inicio de sesión:', error);
    res.status(500).json({ success: false, error: 'Error en el servidor' });
  }
};

module.exports = { localLogin }