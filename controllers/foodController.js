const { Food } = require('../models/food.js');

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.status(200).json({ data: foods });
  } catch (error) {
    console.error('Error getting all foods:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFoodById = async (req, res) => {
  try {
    const { food_id } = req.params;
    const food = await Food.findByPk(food_id);
    if (!food) {
      res.status(404).json({ error: 'Food not found' });
      return;
    }
    res.status(200).json({ data: food });
  } catch (error) {
    console.error('Error getting food by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createFood = async (req, res) => {
  try {
    const { food_name, type, description } = req.body;

    const existingFood = await Food.findOne({ where: { food_name } });
    if (existingFood) {
        res.status(400).json({ error: 'Food already exists' });
        return;
        }
        
    const newFood = await Food.create({
      food_name,
      type,
      description
    });
    console.log('New food created:', newFood.toJSON());
    res.status(201).json({ message: 'New food created', data: newFood.toJSON() });
  } catch (error) {
    console.error('Error creating food:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateFood = async (req, res) => {
  try {
    const { food_id } = req.params;
    const { food_name, type, description } = req.body;
    const food = await Food.findByPk(food_id);
    if (!food) {
      res.status(404).json({ error: 'Food not found' });
      return;
    }
    await food.update({
      food_name,
      type,
      description
    });
    console.log('Food updated:', food.toJSON());
    res.status(200).json({ message: 'Food updated', data: food.toJSON() });
  } catch (error) {
    console.error('Error updating food:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { food_id } = req.params;
    const food = await Food.findByPk(food_id);
    if (!food) {
      res.status(404).json({ error: 'Food not found' });
      return;
    }
    await food.destroy();
    console.log('Food deleted:', food.toJSON());
    res.status(200).json({ message: 'Food deleted', data: food.toJSON() });
  } catch (error) {
    console.error('Error deleting food:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllFoods, getFoodById, createFood, updateFood, deleteFood };
