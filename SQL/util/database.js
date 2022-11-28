const mysql = require("mysql2")

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database : "node_ecommerce",
  password : "Theroom3@2"
})

module.exports = pool.promise()
