const Product = require("../models/product")


exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  })
}

exports.postAddProduct = (req, res) => {
  //   products.push({ title: req.body.title })
  const product = new Product(req.body.title)
  product.save()
  res.redirect("/")
}

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    })
  })
}
