// controllers/userTypeController.js

const UserType = require('../models/userType');

exports.createUserType = async (req, res) => {
    try {
        const newUserType = new UserType(req.body);
        await newUserType.save();
        res.status(201).json(newUserType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getUserType = async (req, res) => {
    try {
        const userType = await UserType.findById(req.params.id);
        if (!userType) {
            return res.status(404).json({ message: 'User type not found' });
        }
        res.json(userType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllUserTypes = async (req, res) => {
    try {
        const userTypes = await UserType.find();
        res.json(userTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateUserType = async (req, res) => {
    try {
        const updatedUserType = await UserType.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedUserType) {
            return res.status(404).json({ message: 'User type not found' });
        }
        res.json(updatedUserType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUserType = async (req, res) => {
    try {
        const deletedUserType = await UserType.findByIdAndDelete(req.params.id);
        if (!deletedUserType) {
            return res.status(404).json({ message: 'User type not found' });
        }
        res.status(200).json({ message: 'User type deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

