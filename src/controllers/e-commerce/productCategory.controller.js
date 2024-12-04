const { isValidObjectId } = require("mongoose");
const Product = require("../../models/e-commerce/product.model");
const Category = require("../../models/e-commerce/productCategory.model");

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.success({ data: categories })
    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}

const getCategoryById = async (req, res) => {
    const { categoryId } = req.params
    try {
        if (!isValidObjectId(categoryId)) {
            return res.error({ message: "Invalid Category Id." })
        }
        const category = await Category.findOne({ _id: categoryId }).lean()
        if (!category) {
            return res.error({ message: "Category not found" })
        }

        const products = await Product.find({ category: categoryId }).lean()
        const categoryWithProducts = {
            ...category,
            products: products
        }
        res.success({ data: categoryWithProducts })
    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}


const addProductCategory = async (req, res) => {
    try {
        const category = req.body
        const { categoryName } = category

        const existedCategory = await Category.find({ categoryName })
        if (existedCategory.length) {
            return res.error({ message: "Category is already existed." })
        }

        const result = await Category.create(category)
        res.success({ data: result, message: "Product category added successfully." })

    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}

module.exports = { getCategories, addProductCategory, getCategoryById }