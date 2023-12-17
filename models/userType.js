// models/UserType.js

const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true
    }
    // You can add more fields if needed
});

const UserType = mongoose.model('UserType', userTypeSchema);

module.exports = UserType;
