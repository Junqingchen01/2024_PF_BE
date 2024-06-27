const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
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
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Order
 *         user_id:
 *           type: integer
 *           description: The id of the user who placed the order
 *         status:
 *           type: string
 *           description: The status of the order
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the order was created
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The Order managing API
 */

/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Create a new Order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: The Order was created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/create', authenticateToken.validateToken, orderController.createOrder);

/**
 * @swagger
 * /order/user:
 *   get:
 *     summary: Get Orders by User
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 */
router.get('/user', authenticateToken.validateToken, orderController.getOrdersbyUser);

/**
 * @swagger
 * /order/user/doneList:
 *   get:
 *     summary: Get completed Orders by User
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of completed orders for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 */
router.get('/user/doneList', authenticateToken.validateToken, orderController.getOrdersDonebyUser);

/**
 * @swagger
 * /order/orderid/{order_id}:
 *   get:
 *     summary: Get Order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the Order
 *     responses:
 *       200:
 *         description: Order found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */
router.get('/orderid/:order_id', authenticateToken.validateToken, orderController.getOrderbyId);

/**
 * @swagger
 * /order/all:
 *   get:
 *     summary: Get all Orders
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 */
router.get('/all', authenticateToken.validateToken, orderController.getALL);

/**
 * @swagger
 * /order/orderid/{order_id}:
 *   put:
 *     summary: Update Order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the Order
 *     responses:
 *       200:
 *         description: Order updated
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put('/orderid/:order_id', authenticateToken.validateToken, orderController.update);

/**
 * @swagger
 * /order/{order_id}:
 *   delete:
 *     summary: Delete Order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the Order
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:order_id', authenticateToken.validateToken, orderController.delete);

module.exports = router;
