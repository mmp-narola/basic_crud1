const express = require('express')
const { getProducts, addProduct, deleteProduct, getProductById, updateProduct } = require('../../controllers/e-commerce/product.controller')
const validationObject = require("../../validation/validationSchemas")
const router = express.Router()


router.get("/", getProducts)
router.get("/:productId", validator(validationObject.queryProductIdSchema), getProductById)
router.post("/add", validator(validationObject.productValidationSchema), addProduct)
router.delete("/delete", validator(validationObject.productIdSchema), deleteProduct)
router.put("/update", validator([...validationObject.productValidationSchema, ...validationObject.productIdSchema]), updateProduct)

module.exports = router