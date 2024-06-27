const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authenticateToken = require('../utilities/utilities');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Menu:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Menu
 *         type_day:
 *           type: string
 *           description: The day type of the Menu (e.g., weekday, weekend)
 *         menu_type:
 *           type: string
 *           description: The type of the Menu (e.g., breakfast, lunch, dinner)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the Menu was created
 */

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: The Menu managing API
 */

/**
 * @swagger
 * /menu/menuid/{menu_id}:
 *   get:
 *     summary: Get Menu by ID
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menu_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the Menu
 *     responses:
 *       200:
 *         description: Menu found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu not found
 *       401:
 *         description: Unauthorized
 */
router.get('/menuid/:menu_id', authenticateToken.validateToken, menuController.getMenuById);

/**
 * @swagger
 * /menu/{type_day}/{menu_type}:
 *   get:
 *     summary: Get Menu by type of day and menu type
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: type_day
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of day (e.g., weekday, weekend)
 *       - in: path
 *         name: menu_type
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of the menu (e.g., breakfast, lunch, dinner)
 *     responses:
 *       200:
 *         description: A list of menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */
router.get('/:type_day/:menu_type', menuController.getMenubyType);

/**
 * @swagger
 * /menu/{type_day}:
 *   get:
 *     summary: Get Menu by type of day
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: type_day
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of day (e.g., weekday, weekend)
 *     responses:
 *       200:
 *         description: A list of menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */
router.get('/:type_day', menuController.getMenuByWeekday);

/**
 * @swagger
 * /menu/menuid/{menu_id}/updateMenuTime:
 *   put:
 *     summary: Update Menu time
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: menu_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the Menu
 *     responses:
 *       200:
 *         description: Menu time updated
 *       400:
 *         description: Bad request
 */
router.put('/menuid/:menu_id/updateMenuTime', menuController.updateMenuTime);

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get all Menus
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken.validateToken, menuController.getAllMenus);

/**
 * @swagger
 * /menu/{type_day}/create:
 *   post:
 *     summary: Create a new Menu by weekday
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type_day
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of day (e.g., weekday, weekend)
 *     responses:
 *       201:
 *         description: The Menu was created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/:type_day/create',
    authenticateToken.validateToken, 
    authenticateToken.isAdmin,  
    menuController.createMenuByWeekday);

/**
 * @swagger
 * /menu/{menu_id}/createMenuItem:
 *   post:
 *     summary: Create a new Menu item by Menu ID
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menu_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the Menu
 *     responses:
 *       201:
 *         description: The Menu item was created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/:menu_id/createMenuItem', 
    authenticateToken.validateToken, 
    authenticateToken.isAdmin,  
    menuController.createMenuItemByMenuId);

/**
 * @swagger
 * /menu/{type_day}/{menu_type}/updateMenuItemAfterOrder:
 *   put:
 *     summary: Update Menu item after order
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: type_day
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of day (e.g., weekday, weekend)
 *       - in: path
 *         name: menu_type
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of the menu (e.g., breakfast, lunch, dinner)
 *     responses:
 *       200:
 *         description: Menu item updated
 *       400:
 *         description: Bad request
 */
router.put('/:type_day/:menu_type/updateMenuItemAfterOrder', menuController.updateMenuItemAfterOrder);

module.exports = router;
