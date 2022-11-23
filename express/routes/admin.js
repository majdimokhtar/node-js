const path = require("path")

const express = require("express")

const rootDir = require("../util/path")

const router = express.Router()

const products = []

// get request admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"))
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct:true
  })
})
// post request admin/add-product =>POST
router.post("/add-product", (req, res) => {
  products.push({ title: req.body.title })
  res.redirect("/")
})

exports.routes = router
exports.products = products
