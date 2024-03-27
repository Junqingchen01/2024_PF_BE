const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authenticateToken = require('../utilities/utilities');

router.post('/', userController.login);
router.post('/register', userController.register);


router.get('/', authenticateToken.validateToken, authenticateToken.isAdmin, userController.getAllUsers);

router.put('updateuser/', authenticateToken.validateToken, userController.updateUser);

module.exports = router;