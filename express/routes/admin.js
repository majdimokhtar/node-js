const express = require("express")

const router = express.Router()

// get request admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  console.log("in the middleware 2")
  res.send(
    "<form action='/admin/add-product' method='POST' ><input type='text' name='title'/><button type='submit'>Add Product</button></form>"
  )
})
// post request admin/add-product =>POST
router.post("/add-product", (req, res) => {
  console.log(req.body)
  res.redirect("/")
})

module.exports = router
