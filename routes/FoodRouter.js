const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/', foodController.getAllFoods);
router.get('/:food_id', foodController.getFoodById);
router.post('/create', foodController.createFood);
router.put('/:food_id/update', foodController.updateFood);
router.delete('/:food_id/delete', foodController.deleteFood);

module.exports = router;