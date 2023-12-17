// checkAccess.js

const ac = require('../middlewares/rolePermissions');

const checkAccess = (action, resource) => {
    return (req, res, next) => {
        const role = req.user.role; // Assuming user's role is stored in req.user.role

        const permission = ac.can(role)[action](resource);

        if (permission.granted) {
            next();
        } else {
            res.status(403).json({ message: "Access Denied." });
        }
    };
};

module.exports = checkAccess;
