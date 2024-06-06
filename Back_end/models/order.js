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
    type: DataTypes.ENUM('done', 'canceled'),
    defaultValue: 'done'
  },
  OrderDate: {
    type: DataTypes.ENUM('Segunda-feira', 'Terça-feira', 
    'Quarta-feira', 'Quinta-feira', 'Sexta-feira'),
  },
  Horario: {
    type: DataTypes.ENUM('Almoço', 'Jantar'),
  },

  avaliar:{
    type: DataTypes.STRING,
    defaultValue: false,
    validate: {
      isIn: [[true, false]]
      
    }
  
  }
}, { sequelize, modelName: 'order' });

// os clientes 
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

// os comidas de orden
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


// comendatario
class Avaliacao extends Model {}
Avaliacao.init({
  avaliacao_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: DataTypes.INTEGER,
  // rating is a number in the range 1-5
  servicerating: {
    type: DataTypes.INTEGER,
    isIn: [[1, 2, 3, 4, 5]]
  },
  temperatureRating: {
    type: DataTypes.INTEGER,
    isIn: [[1, 2, 3, 4, 5]]
  },
  lightRating: {
    type: DataTypes.INTEGER,
    isIn: [[1, 2, 3, 4, 5]]
  },
  Observation: DataTypes.STRING,
  UserID: DataTypes.INTEGER,

}, { sequelize, modelName: 'avaliacao' });

//comentario para comidas
class AvaliacaoFood extends Model {}
AvaliacaoFood.init({
  avaliacaoFood_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  avaliacao_id: DataTypes.INTEGER,
  food_id: DataTypes.INTEGER,
  quantityRating: {
    type: DataTypes.INTEGER,
    isIn: [[1, 2, 3, 4, 5]]
  },
}, { sequelize, modelName: 'avaliacaoFood' });

User.hasMany(Order, { foreignKey: 'UserID' });
Order.belongsTo(User, { foreignKey: 'UserID' });

Order.hasMany(Client, { foreignKey: 'order_id' });
Client.belongsTo(Order, { foreignKey: 'order_id' });

Order.hasOne(Avaliacao, { foreignKey: 'order_id' });
Avaliacao.belongsTo(Order, { foreignKey: 'order_id' });

Avaliacao.hasMany(AvaliacaoFood, { foreignKey: 'avaliacao_id' });
AvaliacaoFood.belongsTo(Avaliacao, { foreignKey: 'avaliacao_id' });

Client.hasMany(Meal, { foreignKey: 'client_id' });
Meal.belongsTo(Client, { foreignKey: 'client_id' });

Meal.belongsTo(Food, { foreignKey: 'food_id' });

module.exports = { sequelize, Order, Client, Meal, Avaliacao, AvaliacaoFood };
