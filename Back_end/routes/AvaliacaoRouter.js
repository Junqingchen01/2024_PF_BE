const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const avaliacaoController = require('../controllers/avaliacaoController.js');
const authenticateToken = require('../utilities/utilities');

// router de avaliação
router.post('/:order_id', authenticateToken.validateToken, avaliacaoController.createAvaliacao);

router.get('/list', authenticateToken.validateToken, avaliacaoController.getAllAvaliacao);


module.exports = router;