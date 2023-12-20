// checkAccess.js

const ac = require('../middlewares/rolePermissions');
const {getUserById} = require('../services/userService');

const checkAccess = (action, resource) => {
    return async (req, res, next) => {
        // Assuming the owner's ID is in the request body
        const ownerId = req.body.owner;
        if (!ownerId) {
            return res.status(400).json({ message: "Owner ID not provided." });
        }

        try {
            const user = await getUserById(ownerId);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            const permission = ac.can(user.role)[action](resource);
            if (permission.granted) {
                next();
            } else {
                res.status(403).json({ message: "Access Denied." });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
};

module.exports = checkAccess;
