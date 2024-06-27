const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController.js');
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
 *     Avaliacao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Avaliacao
 *         order_id:
 *           type: integer
 *           description: The id of the order
 *         content:
 *           type: string
 *           description: The content of the Avaliacao
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the Avaliacao was created
 */

/**
 * @swagger
 * tags:
 *   name: Avaliacao
 *   description: The Avaliacao managing API
 */

/**
 * @swagger
 * /avaliacao/{order_id}:
 *   post:
 *     summary: Create a new Avaliacao
 *     tags: [Avaliacao]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the order
 *     responses:
 *       201:
 *         description: The Avaliacao was created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/:order_id', authenticateToken.validateToken, avaliacaoController.createAvaliacao);

/**
 * @swagger
 * /avaliacao/list:
 *   get:
 *     summary: Get all Avaliacoes
 *     tags: [Avaliacao]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Avaliacoes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avaliacao'
 *       401:
 *         description: Unauthorized
 */
router.get('/list', authenticateToken.validateToken, avaliacaoController.getAllAvaliacao);

/**
 * @swagger
 * /avaliacao/MyList:
 *   get:
 *     summary: Get all Avaliacoes of the authenticated user
 *     tags: [Avaliacao]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Avaliacoes of the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avaliacao'
 *       401:
 *         description: Unauthorized
 */
router.get('/MyList', authenticateToken.validateToken, avaliacaoController.getMyAvaliacao);

/**
 * @swagger
 * /avaliacao/{avaliacao_id}:
 *   get:
 *     summary: Get Avaliacao by ID
 *     tags: [Avaliacao]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: avaliacao_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the Avaliacao
 *     responses:
 *       200:
 *         description: Avaliacao found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Avaliacao not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:avaliacao_id', authenticateToken.validateToken, avaliacaoController.getAvaliacaoByID);

/**
 * @swagger
 * /avaliacao/{avaliacao_id}:
 *   delete:
 *     summary: Delete Avaliacao by ID
 *     tags: [Avaliacao]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: avaliacao_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the Avaliacao
 *     responses:
 *       200:
 *         description: Avaliacao deleted
 *       404:
 *         description: Avaliacao not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:avaliacao_id', authenticateToken.validateToken, avaliacaoController.delectmyAvaliacao);

module.exports = router;
