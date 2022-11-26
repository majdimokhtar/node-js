const fs = require("fs")
const path = require("path")
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
)

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //fetching cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        cart = JSON.parse(fileContent)
      }
      //analyse cart
      const existingProductsIndex = cart.products.findIndex(
        (prod) => prod.id === id
      )
      const existingProduct = cart.products[existingProductsIndex]
      let updatedProduct
      //add new increase qty
      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.qty = updatedProduct.qty + 1
        cart.products = [...cart.products]
        cart.products[existingProductsIndex] = updatedProduct
      } else {
        updatedProduct = { id: id, qty: 1 }
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + +productPrice
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err)
      })
    })
  }
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return
      }
      const updatedCart = { ...fileContent }
      const product = updatedCart.products.find((prod) => prod.id === id)
      const productQty = product.qty
      updatedCart.products = updatedCart.products.fillter(
        (prod) => prod.id !== id
      )
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err)
      })
    })
  }
}
