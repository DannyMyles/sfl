const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  define: {
      foreignKeyConstraints: true,
  },
});

module.exports = sequelize;
