const { validationResult } = require("express-validator");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

// login
exports.login = async (req, res) => {
  try {
    const { NameOrEmail, Password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { Name: NameOrEmail },
          { Email: NameOrEmail }
        ]
      },
    });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(Password, user.Password);

      if (isPasswordMatch) {
        const token = jwt.sign(
          { 
            UserID: user.UserID, 
            Name: user.Name, 
            Email: user.Email, 
            UserType: user.UserType,
          },
          "secret-key",
          { expiresIn: "2h" } 
        );

        res.status(200).json({ 
          token,
          user: {
            UserID: user.UserID,
            Name: user.Name,
            Email: user.Email,
            UserType: user.UserType,
            Avatar: user.Avatar,
            Tel: user.Tel,

          }
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// register
exports.register = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { Name, Email, Password, Avatar, Tel } = req.body;
      const hashedPassword = await bcrypt.hash(Password, 10);
  
      const user = await User.create({
        Name,
        Email,
        Password: hashedPassword,
        Avatar,
        Tel,
        
      });
  
      res.status(201).json(user);
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }


// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// update user
exports.updateUser = async (req, res) => {
  try {
    const { UserID } = req; 
    const { newname, newemail,newpassword,newavatar,newtel } = req.body; 

    const user = await User.findByPk(UserID);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.Name = newname || user.Name; 
    user.Email = newemail || user.Email; 
    user.Password = newpassword || user.Password;
    user.Avatar = newavatar || user.Avatar;
    user,Tel = newtel || user.Tel;

    await user.save();

    res.status(200).json({ message: 'User information updated successfully' });
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

