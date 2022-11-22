const path = require("path")

const express = require("express")


const rootDir = require("../util/path")

const router = express.Router()

// get request admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, rootDir, "views", "add-product.html"))
})
// post request admin/add-product =>POST
router.post("/add-product", (req, res) => {
  console.log(req.body)
  res.redirect("/")
})

module.exports = router
