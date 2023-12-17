const Store = require('../models/store'); // Assuming Store model is defined

const createStore = async (storeData) => {
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

module.exports = {
    createStore,
    getStoreById,
    getAllStores,
    updateStore,
    deleteStore
};
