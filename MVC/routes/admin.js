const path = require("path")

const express = require("express")

const productController = require("../controllers/products")

const router = express.Router()

// get request admin/add-product => GET
router.get("/add-product", productController.getAddProduct)
// post request admin/add-product =>POST
router.post("/add-product", productController.postAddProduct)

module.exports = router
// exports.products = products
