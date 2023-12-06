const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://shokal07:4HpnJUKN1rcINfxU@bitebuddy0.xocxta6.mongodb.net/?retryWrites=true&w=majority');
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;