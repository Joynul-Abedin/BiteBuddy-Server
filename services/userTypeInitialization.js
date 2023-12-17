// seedUserTypes.js

const UserType = require('../models/userType');

const initialUserTypes = ['customer', 'owner', 'restaurant', 'deliveryMan', 'admin'];

const seedUserTypes = async () => {
    await Promise.all(initialUserTypes.map(async (type) => {
        const existingType = await UserType.findOne({ type });
        if (!existingType) {
            await UserType.create({ type });
        }
    }));
};

module.exports = seedUserTypes;
