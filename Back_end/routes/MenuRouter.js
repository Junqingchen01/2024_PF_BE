const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authenticateToken = require('../utilities/utilities');

// menu routes
router.get('/:type_day/:menu_type', authenticateToken.validateToken,menuController.getMenubyType);
router.get('/:type_day',authenticateToken.validateToken, menuController.getMenuByWeekday);
// get all menus
router.get('/',authenticateToken.validateToken, menuController.getAllMenus);

router.post('/:type_day/create',
        authenticateToken.validateToken, 
        authenticateToken.isAdmin,  
        menuController.createMenuByWeekday);

//menuitem routes
router.post('/:menu_id/createMenuItem', 
        authenticateToken.validateToken, 
        authenticateToken.isAdmin,  
        menuController.createMenuItemByMenuId);


router.put('/:type_day/:menu_type/updateMenuItemAfterOrder', menuController.updateMenuItemAfterOrder);


module.exports = router;
