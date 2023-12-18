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
    hasStore:{
        type: Boolean,
    },
    emailVerificationToken: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Users", userSchema);
    
