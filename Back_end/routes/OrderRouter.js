const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require('../utilities/utilities');

router.post('/create', authenticateToken.validateToken, orderController.createOrder);

router.get('/user/:UserID', authenticateToken.validateToken, orderController.getOrdersbyUser);
router.get('/:order_id', authenticateToken.validateToken, orderController.getOrderbyId);

router.put('/:order_id', authenticateToken.validateToken, orderController.update);

router.delete('/:order_id', authenticateToken.validateToken, orderController.delete);

module.exports = router;