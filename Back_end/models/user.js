const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connections/mysql").sequelize;

class User extends Model {}

User.init(
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
    },
    Tel: DataTypes.STRING,
    UserType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'client',
      validate: {
        isIn: [['client', 'admin']],
      },
    },
  },
  { 
    sequelize, 
    modelName: "User",
    indexes: [ 
      {
        unique: true,
        fields: ['Name'], 
      },
      {
        unique: true,
        fields: ['Email'],
      },
    ]
  }
);

module.exports = { sequelize, User };
