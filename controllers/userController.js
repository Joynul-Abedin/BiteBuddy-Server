// controllers/userController.js

const userService = require('../services/userService'); // Your file path might be different

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
