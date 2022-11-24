const path = require("path")
const fs = require("fs")
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
)
const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
       callback([])
    } else {
      callback(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  constructor(t) {
    this.title = t
  }
  save() {
    //should use arr fct for this
    getProductsFromFile((products) => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }
  static fetchAll(callback) {
    getProductsFromFile(callback)
  }
}
