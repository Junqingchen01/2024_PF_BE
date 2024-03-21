const express = require('express');
const router = express.Router();
const WeekdayController = require('../controllers/WeekdayController');

// weekday routes
router.get('/', WeekdayController.getallWeekdays);
router.post('/create', WeekdayController.createWeekday);



module.exports = router;
