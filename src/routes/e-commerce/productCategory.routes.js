const express = require('express')
const { addProductCategory, getCategories, getCategoryById } = require('../../controllers/e-commerce/productCategory.controller')
const router = express.Router()


router.get("/", getCategories)
router.post("/", addProductCategory)
router.get("/:categoryId", getCategoryById)
// router.delete("/", deleteUser)
// router.put("/", updateUser)

module.exports = router