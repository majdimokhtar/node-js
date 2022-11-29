const Sequelize = require("sequelize")

const sequelize = new Sequelize("node_ecommerce", "root", "Theroom3@2", {
  dialect: "mysql",
  host: "localhost",
})

module.exports = sequelize
