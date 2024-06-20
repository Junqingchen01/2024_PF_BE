const express = require('express');
const router = express.Router();
const WeekdayController = require('../controllers/weekdayController.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Weekday:
 *       type: object
 *       required:
 *         - type_day
 *       properties:
 *         weekday_id:
 *           type: integer
 *           description: The auto-generated id of the weekday
 *         type_day:
 *           type: string
 *           description: The type of the day (e.g., monday, tuesday, wednesday, thursday, friday)
 *       example:
 *         weekday_id: 1
 *         type_day: segunda-feira
 */

/**
 * @swagger
 * /weekdays:
 *   get:
 *     summary: Returns the list of all weekdays
 *     tags: [Weekday]
 *     responses:
 *       200:
 *         description: The list of weekdays
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Weekday'
 */
router.get('/', WeekdayController.getallWeekdays);

/**
 * @swagger
 * /weekdays/create:
 *   post:
 *     summary: Create a new weekday
 *     tags: [Weekday]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Weekday'
 *     responses:
 *       200:
 *         description: The weekday was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weekday'
 *       500:
 *         description: Some server error
 */
router.post('/create', WeekdayController.createWeekday);

/**
 * @swagger
 * /weekdays/{type_day}:
 *   get:
 *     summary: Get the weekday by type_day
 *     tags: [Weekday]
 *     parameters:
 *       - in: path
 *         name: type_day
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of the day
 *     responses:
 *       200:
 *         description: The weekday description by type_day
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weekday'
 *       404:
 *         description: The weekday was not found
 */
router.get('/:type_day', WeekdayController.getWeekday);

/**
 * @swagger
 * /weekdays/{type_day}/update:
 *   put:
 *     summary: Update the weekday by type_day
 *     tags: [Weekday]
 *     parameters:
 *       - in: path
 *         name: type_day
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of the day
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Weekday'
 *     responses:
 *       200:
 *         description: The weekday was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weekday'
 *       404:
 *         description: The weekday was not found
 *       500:
 *         description: Some server error
 */
router.put('/:type_day/update', WeekdayController.updateWeekday);

module.exports = router;
