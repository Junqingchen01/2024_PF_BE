// models.js
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../connections/mysql").sequelize;
const { Food } = require('./food');

class Weekday extends Model {
  static getCurrentWeekday() {
    const currentDate = new Date();
    const weekdayIndex = currentDate.getDay(); 
    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return weekdays[weekdayIndex];
  }
}
Weekday.init({
  weekday_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type_day: {
    type: DataTypes.STRING(10),
    validate: {
      isIn: [[ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']]
    },
    defaultValue: Weekday.getCurrentWeekday() 
  },
  lunch_start_time: DataTypes.TIME,
  lunch_end_time: DataTypes.TIME,
  dinner_start_time: DataTypes.TIME,
  dinner_end_time: DataTypes.TIME 
  }, { sequelize, modelName: 'weekday' });

class Menu extends Model {}
Menu.init({
  menu_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  weekday_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Weekday,
      key: 'weekday_id'
    }
  },
  menu_type: {
    type: DataTypes.STRING(20),
    validate: {
      isIn: [['Almoço', 'Jantar']]
    }
  },
  maximum_capacity: DataTypes.INTEGER
}, { sequelize, modelName: 'menu' });

class MenuItem extends Model {}
MenuItem.init({
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  menu_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Menu,
      key: 'menu_id'
    }
  },
  food_id: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER
}, { sequelize, modelName: 'menuItem' });



Weekday.hasMany(Menu, { foreignKey: 'weekday_id' });
Menu.belongsTo(Weekday, { foreignKey: 'weekday_id' });

Menu.hasMany(MenuItem, { foreignKey: 'menu_id' });
MenuItem.belongsTo(Menu, { foreignKey: 'menu_id' });

MenuItem.belongsTo(Food, { foreignKey: 'food_id' });
Food.belongsTo(MenuItem, { foreignKey: 'food_id' });



module.exports = { sequelize, Weekday, Menu, MenuItem };
