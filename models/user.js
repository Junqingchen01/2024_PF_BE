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
    Avatar: DataTypes.STRING,
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

module.exports = User;
