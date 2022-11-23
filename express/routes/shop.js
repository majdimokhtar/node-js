const path = require("path")

const express = require("express")

const rootDir = require("../util/path")
const adminData = require("./admin")

const router = express.Router()

router.get("/", (req, res, next) => {
  // console.log("shop",adminData.products)
  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"))
  const products = adminData.products 
  res.render("shop", { prods: products, PageTitle: "Shop" , path :"/" })
})

module.exports = router
