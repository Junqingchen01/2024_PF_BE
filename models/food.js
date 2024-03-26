const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../connections/mysql").sequelize;

class Food extends Model {}
Food.init({
  food_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  food_name: DataTypes.STRING(100),
  description: DataTypes.TEXT,
  type: {
    type: DataTypes.STRING(20),
    validate: {
      isIn: [['pre prato', 'prato principal', 'sobremesa']]
    }
  },
}, { sequelize, modelName: 'food' });



sequelize.sync({ force: false }).then(() => {
  console.log('synced table succeso。');
}).catch(err => {
  console.error('Error syncing table：', err);
});

module.exports = { sequelize, Food };
