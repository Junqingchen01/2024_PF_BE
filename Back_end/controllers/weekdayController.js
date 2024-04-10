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

exports.getWeekday = async (req, res) => {
  try {
    const { type_day } = req.params;
    const weekday = await Weekday.findOne({ where: { type_day } });
    if (!weekday) {
      return res.status(404).json({ error: `${type_day} not found` });
    }
    res.status(200).json({ data: weekday });
  } catch (error) {
    console.error('Error getting weekday:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.updateWeekday = async (req, res) => {
  try {
    const { type_day } = req.params;
    const { lunch_start_time, lunch_end_time, dinner_start_time, dinner_end_time } = req.body;
    const existingWeekday = await Weekday.findOne({ where: { type_day } });
    if (!existingWeekday) {
      return res.status(404).json({ error: `${type_day} not found` });
    }
    const updatedAttributes = {};
    if (lunch_start_time !== undefined) {
      updatedAttributes.lunch_start_time = lunch_start_time;
    }
    if (lunch_end_time !== undefined) {
      updatedAttributes.lunch_end_time = lunch_end_time;
    }
    if (dinner_start_time !== undefined) {
      updatedAttributes.dinner_start_time = dinner_start_time;
    }
    if (dinner_end_time !== undefined) {
      updatedAttributes.dinner_end_time = dinner_end_time;
    }
    await existingWeekday.update(updatedAttributes);
    const updatedWeekday = await Weekday.findOne({ where: { type_day } });
    res.status(200).json(updatedWeekday);
  } catch (error) {
    console.error('Error updating weekday:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
