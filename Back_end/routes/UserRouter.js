const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authenticateToken = require('../utilities/utilities');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Name
 *         - Email
 *         - Password
 *         - UserType
 *       properties:
 *         UserID:
 *           type: integer
 *           description: The auto-generated id of the user
 *         Name:
 *           type: string
 *           description: The name of the user
 *         Email:
 *           type: string
 *           description: The email of the user
 *         Password:
 *           type: string
 *           description: The password of the user
 *         Avatar:
 *           type: string
 *           description: The avatar URL of the user
 *         Tel:
 *           type: string
 *           description: The telephone number of the user
 *         UserType:
 *           type: string
 *           description: The type of the user (e.g., client, admin)
 *       example:
 *         UserID: 1
 *         Name: John Doe
 *         Email: johndoe@example.com
 *         Password: securepassword
 *         Avatar: 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
 *         Tel: '123456789'
 *         UserType: client
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *             example:
 *               Email: johndoe@example.com
 *               Password: securepassword
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/', userController.login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Access forbidden
 */
router.get('/', authenticateToken.validateToken, authenticateToken.isAdmin, userController.getAllUsers);

/**
 * @swagger
 * /users/{UserID}:
 *   get:
 *     summary: Get the user by UserID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: UserID
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user description by UserID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       403:
 *         description: Access forbidden
 */
router.get('/:UserID', authenticateToken.validateToken, userController.getUserbyID);

/**
 * @swagger
 * /users/updateuser:
 *   put:
 *     summary: Update the user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       403:
 *         description: Access forbidden
 */
router.put('/updateuser', authenticateToken.validateToken, userController.updateUser);

module.exports = router;
