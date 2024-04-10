const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authenticateToken = require('../utilities/utilities');

// menu routes
router.get('/:type_day/', authenticateToken.validateToken,menuController.getMenuByWeekday);
router.get('/:type_day/:menu_type', authenticateToken.validateToken,menuController.getMenuAndType);


router.post('/:type_day/create',
        authenticateToken.validateToken, 
        authenticateToken.isAdmin,  
        menuController.createMenuByWeekday);

//menuitem routes
router.post('/:menu_id/createMenuItem', 
        authenticateToken.validateToken, 
        authenticateToken.isAdmin,  
        menuController.createMenuItemByMenuId);


router.put('/:menu_id/updateMenuItemAfterOrder', menuController.updateMenuItemAfterOrder);


module.exports = router;
