const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');



// menu routes
router.get('/:weekday_id/', menuController.getMenuByWeekdayId);
router.post('/:weekday_id/create', menuController.createMenuByWeekdayId);



//menuitem routes
router.post('/:menu_id/createMenuItem', menuController.createMenuItemByMenuId);

router.put('/:menu_id/updateMenuItemAfterOrder', menuController.updateMenuItemAfterOrder);


module.exports = router;
