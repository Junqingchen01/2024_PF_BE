const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const authenticateToken = require('../utilities/utilities');


router.get('/',foodController.getAllFoods);
router.get('/:food_id',foodController.getFoodById);
router.post('/create', authenticateToken.validateToken,foodController.createFood);
router.put('/:food_id/update', authenticateToken.validateToken,foodController.updateFood);
router.delete('/:food_id/delete', foodController.deleteFood);

module.exports = router;