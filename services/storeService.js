const Store = require('../models/store'); // Assuming Store model is defined

const createStore = async (storeData) => {
    // Check if a store with the same name and owner ID already exists
    const existingStore = await Store.findOne({ 
        name: storeData.name, 
        owner: storeData.owner 
    });

    if (existingStore) {
        throw new Error('A store with this name already exists for this owner.');
    }

    const store = new Store(storeData);
    await store.save();
    return store;
};


const getStoreById = async (storeId) => {
    return await Store.findById(storeId);
};

const getAllStores = async () => {
    return await Store.find({});
};

const updateStore = async (storeId, updateData) => {
    return await Store.findByIdAndUpdate(storeId, updateData, { new: true });
};

const deleteStore = async (storeId) => {
    return await Store.findByIdAndDelete(storeId);
};
const getStoresByOwnerId = async (ownerId) => {
    return await Store.find({ owner: ownerId });
};


module.exports = {
    createStore,
    getStoreById,
    getAllStores,
    updateStore,
    deleteStore,
    getStoresByOwnerId
};
