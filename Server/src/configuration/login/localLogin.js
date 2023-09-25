const { compare } = require('../../middlewares/hashPassword')
const {} = require('../../middlewares/tokens/loginToken')

const localLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ success: false, msg: 'Correo electrónico no válido' });
    }

    const isPasswordValid = await compare(password, user.password);

    if (isPasswordValid) {
      const tokenSession = await tokenSign(user);
      res.status(200).json({ success: true, data: user, token: tokenSession });
    } else {
      res.status(401).json({ success: false, msg: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error('Error en el controlador de inicio de sesión:', error);
    res.status(500).json({ success: false, error: 'Error en el servidor' });
  }
};

module.exports = { localLogin }