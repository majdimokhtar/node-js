const express = require("express")

const router = express.Router()



router.get("/", (req, res, next) => {
    console.log("in the middleware 2")
    res.send("<h1>Hello from express</h1>")
  })


  module.exports = router