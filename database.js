const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expenses", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false, 
});

sequelize.authenticate()
  .then(() => console.log("Connected to MySQL with Sequelize."))
  .catch((err) => console.error("Sequelize connection error:", err));
module.exports = sequelize;
