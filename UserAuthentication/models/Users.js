const mongoose = require('mongoose');
const { userTypes } = require('../models/userEnums');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: userTypes,
        default: 'user',
        required: true
    },
    emailVerificationToken: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    favoriteFoods: {
        type: [String]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Users", userSchema);
    
