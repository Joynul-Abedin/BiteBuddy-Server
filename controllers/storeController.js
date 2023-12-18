const storeService = require('../services/storeService');
const User = require('../models/Users');

const createStore = async (req, res) => {
    try {
        const store = await storeService.createStore(req.body);

        // Assuming the user's ID is stored in req.user.id
        const userId = req.user.id;
        await User.findByIdAndUpdate(userId, { hasStore: true });

        res.status(201).json(store);
    } catch (error) {
        if (error.message.includes('store with this name already exists')) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};


const getStoreById = async (req, res) => {
    try {
        const store = await storeService.getStoreById(req.params.storeId);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.json(store);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllStores = async (req, res) => {
    try {
        const stores = await storeService.getAllStores();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStore = async (req, res) => {
    try {
        const updatedStore = await storeService.updateStore(req.params.storeId, req.body);
        if (!updatedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.json(updatedStore);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteStore = async (req, res) => {
    try {
        const store = await storeService.deleteStore(req.params.storeId);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(204).json({ message: 'Store deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStoresByOwnerId = async (req, res) => {
    try {
        const ownerId = req.params.ownerId;
        const stores = await storeService.getStoresByOwnerId(ownerId);
        if (!stores || stores.length === 0) {
            return res.status(404).json({ message: 'No stores found for this owner' });
        }
        res.json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createStore,
    getStoreById,
    getAllStores,
    updateStore,
    deleteStore,
    getStoresByOwnerId
};
