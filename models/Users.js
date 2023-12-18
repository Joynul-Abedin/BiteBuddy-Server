const mongoose = require('mongoose');

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
        default: 'customer',
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
    
