const express = require('express')
const { getProducts, addProduct, deleteProduct, getProductById, updateProduct } = require('../../controllers/e-commerce/products.controller')
const router = express.Router()


router.get("/", getProducts)
router.post("/add", addProduct)
router.get("/:productId", getProductById)
router.delete("/delete", deleteProduct)
router.put("/update", updateProduct)

module.exports = router