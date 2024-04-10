const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const avaliacaoController = require('../controllers/avaliacaoController.js');
const authenticateToken = require('../utilities/utilities');

// Rotas de orders
router.post('/create', authenticateToken.validateToken, orderController.createOrder);

router.get('/user/', authenticateToken.validateToken, orderController.getOrdersbyUser);
router.get('/user/doneList', authenticateToken.validateToken, orderController.getOrdersDonebyUser);
router.get('/:order_id', authenticateToken.validateToken, orderController.getOrderbyId);

router.put('/:order_id', authenticateToken.validateToken, orderController.update);

router.delete('/:order_id', authenticateToken.validateToken, orderController.delete);





module.exports = router;