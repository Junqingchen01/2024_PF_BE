const { Weekday } = require('../models/weekday.js');

exports.createWeekday = async (req, res) => {
  try {
    const { type_day, lunch_start_time, lunch_end_time, dinner_start_time, dinner_end_time } = req.body;
    const existingWeekday = await Weekday.findOne({ where: { type_day } });
    if (existingWeekday) {
      return res.status(400).json({ error: `${type_day} already exists` });
    }
    const newWeekday = await Weekday.create({
      type_day,
      lunch_start_time,
      lunch_end_time,
      dinner_start_time,
      dinner_end_time
    });

    console.log('New weekday created:', newWeekday.toJSON());
    res.status(201).json({ message: 'New weekday created', data: newWeekday });
  } catch (error) {
    console.error('Error creating weekday:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getallWeekdays = async (req, res) => {
  try {
    const weekdays = await Weekday.findAll();
    res.status(200).json({ data: weekdays });
  } catch (error) {
    console.error('Error getting all weekdays:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
