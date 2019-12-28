const Sequelize = require("sequelize");
const DB = require("../config/db");
const User = DB.define(
  "users",
  {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    zipcode: {
      type: Sequelize.STRING
    },
    profile: {
      type: Sequelize.JSON
    },
    document: {
      type: Sequelize.JSON
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);

module.exports = User;
