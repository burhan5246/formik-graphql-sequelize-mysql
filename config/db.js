const Sequelize = require("sequelize");

const DB = new Sequelize("RentZend", "root", "", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = DB;
