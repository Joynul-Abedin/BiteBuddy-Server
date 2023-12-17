const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    location: {
        // GeoJSON format for storing geospatial data
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contact: {
        phone: String,
        email: String,
        website: String
    },
    description: String,
    categories: [String], // e.g., ['Italian', 'Bakery']
    menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem'
    }],
    hours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        // Repeat for other days of the week
    },
    ratings: [{
        rating: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        review: String,
        date: Date
    }],
    images: [String], // URLs to images of the store
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure location is indexed for geospatial queries
storeSchema.index({ location: '2dsphere' });

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
