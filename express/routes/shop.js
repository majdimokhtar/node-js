const path = require("path")

const express = require("express")

const rootDir = require("../util/path")
const adminData = require("./admin")

const router = express.Router()

router.get("/", (req, res, next) => {
  // console.log("shop",adminData.products)
  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"))
  const products = adminData.products
  res.render("shop", {
    prods: products,
    PageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop :true,
    productCSS :true,
    layout :false
  })
})

module.exports = router
