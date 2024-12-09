const express = require('express')
const { addProductCategory, getCategories, getCategoryById, deleteCategory, updateCategory } = require('../../controllers/e-commerce/productCategory.controller')
const validationObject = require('../../validation/validationSchemas')
const router = express.Router()


router.get("/", getCategories)
router.post("/add", validator(validationObject.categoryValidationSchema), addProductCategory)
router.get("/:categoryId", validator(validationObject.queryCategoryIdSchema), getCategoryById)
router.delete("/delete", validator(validationObject.categoryIdSchema), deleteCategory)
router.put("/update", validator([...validationObject.categoryValidationSchema, ...validationObject.categoryIdSchema]), updateCategory)

module.exports = router