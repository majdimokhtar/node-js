const path = require("path")
const { check, body } = require("express-validator/check")

const express = require("express")

const adminController = require("../controllers/admin")

const router = express.Router()
const isAuth = require("../middlewares/is-auth")

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct)

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts)

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").trim().isLength({ min: 5, max: 400 }),
  ],
  isAuth,
  adminController.postAddProduct
)

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct)

router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").trim().isLength({ min: 5, max: 400 }),
  ],
  isAuth,
  adminController.postEditProduct
)

router.post("/delete-product", isAuth, adminController.postDeleteProduct)

module.exports = router
