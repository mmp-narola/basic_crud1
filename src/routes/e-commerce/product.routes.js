const express = require('express')
const { getProducts, addProduct, deleteProduct, getProductById, updateProduct } = require('../../controllers/e-commerce/products.controller')
const router = express.Router()


router.get("/", getProducts)
router.post("/", addProduct)
router.get("/:productId", getProductById)
router.delete("/", deleteProduct)
router.put("/", updateProduct)

module.exports = router