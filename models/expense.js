const Sequelize = require("sequelize");

const sequelize = require("../database"); 

const Expense = sequelize.define("expenses", {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
});

module.exports = Expense;
