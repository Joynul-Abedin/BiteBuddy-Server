const User = require('../models/Users');
const bcrypt = require('bcrypt');

async function createUser(name, email, password, role) {
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return newUser;
  }
  catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    console.log("ID to be used for getUserById: ", id);
    const user = await User.findById(id);
    console.log("User-", user);

    return user;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createUser,
  getUserByEmail,
  getUserById
};