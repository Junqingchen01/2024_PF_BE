const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../connections/mysql").sequelize;
const { Food } = require('./food');
const { User } = require('./user');


class Order extends Model {}
Order.init({
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: DataTypes.INTEGER,
  number_people: DataTypes.INTEGER,
  status: {
    type: DataTypes.ENUM('done', 'canceled', 'in_progress'),
    defaultValue: 'in_progress'
  },
  Date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, { sequelize, modelName: 'order' });

class Client extends Model {}
Client.init({
  client_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  indifferent: DataTypes.BOOLEAN
}, { sequelize, modelName: 'client' });

class Meal extends Model {}
Meal.init({
  meal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  client_id: DataTypes.INTEGER,
  food_id: DataTypes.INTEGER,
  observation: DataTypes.STRING
}, { sequelize, modelName: 'meal' });

// 定义模型间的关联关系
User.hasMany(Order, { foreignKey: 'UserID' });
Order.belongsTo(User, { foreignKey: 'UserID' });

Order.hasMany(Client, { foreignKey: 'order_id' });
Client.belongsTo(Order, { foreignKey: 'order_id' });

Client.hasMany(Meal, { foreignKey: 'client_id' });
Meal.belongsTo(Client, { foreignKey: 'client_id' });

Meal.belongsTo(Food, { foreignKey: 'food_id' });

module.exports = { sequelize, Order, Client, Meal };
