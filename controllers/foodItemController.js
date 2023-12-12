const FoodItem = require('../models/foodItem');

exports.createFoodItem = async (req, res) => {
  try {
    const newFoodItem = new FoodItem(req.body);
    const savedFoodItem = await newFoodItem.save();
    res.status(201).json(savedFoodItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateFoodItem = async (req, res) => {
  try {
    const updatedFoodItem = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFoodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(updatedFoodItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteFoodItem = async (req, res) => {
  console.log('deleteFoodItem');
  try {
    // const deletedFoodItem = await FoodItem.findByIdAndRemove(req.params.id);
    const deletedFoodItem = await FoodItem.deleteOne( {"_id": req.params.id});

    if (!deletedFoodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
