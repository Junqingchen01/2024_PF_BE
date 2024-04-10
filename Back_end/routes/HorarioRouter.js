const express = require('express');
const router = express.Router();
const WeekdayController = require('../controllers/WeekdayController');

// weekday routes
router.get('/', WeekdayController.getallWeekdays);
router.post('/create', WeekdayController.createWeekday);


router.get('/:type_day', WeekdayController.getWeekday);
router.put('/:type_day/update', WeekdayController.updateWeekday);

module.exports = router;
