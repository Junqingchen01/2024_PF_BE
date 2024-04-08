const express = require("express");
const { query, param, body, validationResult } = require("express-validator");
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swagerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Client API',
          version: '1.0.0',
      }
  },
  apis: ['./routes/*.js']
}
const specs = swagerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// connect to mysql
const mysqlConn = require("./connections/mysql").sequelize;
app.use(express.json());

// Information home page
app.get('/home', function (req, res) {
  res.status(200).json({message:'Home page! Welcome to ESHT restaurante API!'});
});


// router
const HorarioRouter = require('./routes/HorarioRouter');
app.use('/horario', HorarioRouter);

const FoodRouter = require('./routes/FoodRouter');
app.use('/food', FoodRouter);

const MenuRouter = require('./routes/MenuRouter');
app.use('/menu', MenuRouter);

const UserRouter = require('./routes/UserRouter');
app.use('/user', UserRouter);
app.use('/login', UserRouter);

const OrderRouter = require('./routes/OrderRouter');
app.use('/order', OrderRouter);

mysqlConn
  .sync({ force: false }) 
  .then(() => {
    console.log("All database tables synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing database tables:", err);
  });

app.listen(port, () => {
    console.log("App is running on port " + port);
    mysqlConn
      .authenticate()
      .then(() => {
        console.log("Connected to mysql database");
      })
      .catch((err) => {
        console.log("Error connecting to the database");
      });
  });
  
module.exports = app;
