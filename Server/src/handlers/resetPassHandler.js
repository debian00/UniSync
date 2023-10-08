const { User } = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resetPassHandler = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        
        jwt.verify(token, "jwt_secret_key", async (err, decoded) => {
            if (err) {
                return res.json({ Status: "Error with token" });
            }

           
            const hash = await bcrypt.hash(password, 10);

          
            const updatedUser = await User.update(
                { password: hash },
                { where: { id } }
            );

            if (updatedUser[0] === 1) {
                res.json({ Status: "Success" });
            } else {
                res.json({ Status: "User not found" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Status: "Error with token verification" });
    }
}

module.exports = { resetPassHandler };
