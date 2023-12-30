const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const dotenv = require('dotenv');

dotenv.config();

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '6h' } 
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasStore: user.hasStore
      },
    });
  }
  catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  loginUser,
};