const express = require('express')
const { addProductCategory, getCategories, getCategoryById, deleteCategory, updateCategory } = require('../../controllers/e-commerce/productCategory.controller')
const router = express.Router()


router.get("/", getCategories)
router.post("/add", addProductCategory)
router.get("/:categoryId", getCategoryById)
router.delete("/delete", deleteCategory)
router.put("/update", updateCategory)

module.exports = router