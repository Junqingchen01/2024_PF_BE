const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const authenticateToken = require('../utilities/utilities');

/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       required:
 *         - food_name
 *         - type
 *       properties:
 *         food_id:
 *           type: integer
 *           description: The auto-generated id of the food item
 *         food_name:
 *           type: string
 *           description: The name of the food item
 *         description:
 *           type: string
 *           description: The description of the food item
 *         type:
 *           type: string
 *           description: The type of the food item (e.g., pre prato, prato principal, sobremesa)
 *       example:
 *         food_id: 1
 *         food_name: peixe
 *         description: bom peixe
 *         type: prato principal
 */

/**
 * @swagger
 * /foods:
 *   get:
 *     summary: Returns the list of all the foods
 *     tags: [Food]
 *     responses:
 *       200:
 *         description: The list of the foods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 */
router.get('/', foodController.getAllFoods);

/**
 * @swagger
 * /foods/{food_id}:
 *   get:
 *     summary: Get the food item by id
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: food_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The food id
 *     responses:
 *       200:
 *         description: The food item description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: The food item was not found
 */
router.get('/:food_id', foodController.getFoodById);

/**
 * @swagger
 * /foods/create:
 *   post:
 *     summary: Create a new food item
 *     tags: [Food]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: The food item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       500:
 *         description: Some server error
 */
router.post('/create', authenticateToken.validateToken, foodController.createFood);

/**
 * @swagger
 * /foods/{food_id}/update:
 *   put:
 *     summary: Update the food item by the id
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: food_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The food id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: The food item was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: The food item was not found
 *       500:
 *         description: Some server error
 */
router.put('/:food_id/update', authenticateToken.validateToken, foodController.updateFood);

/**
 * @swagger
 * /foods/{food_id}/delete:
 *   delete:
 *     summary: Remove the food item by id
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: food_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The food id
 *     responses:
 *       200:
 *         description: The food item was deleted
 *       404:
 *         description: The food item was not found
 */
router.delete('/:food_id/delete', foodController.deleteFood);

module.exports = router;
