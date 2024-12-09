const { isValidObjectId } = require("mongoose");
const Product = require("../../models/e-commerce/product.model");
const Category = require("../../models/e-commerce/productCategory.model");
const createError = require('http-errors')

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.success({ data: categories })
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

const getCategoryById = async (req, res) => {
    const { categoryId } = req.params
    try {
        if (!isValidObjectId(categoryId)) {
            throw new createError(422, "Invalid Category Id.")
        }
        const category = await Category.findOne({ _id: categoryId }).lean()
        if (!category) {
            throw new createError(404, "Category not found")
        }

        const products = await Product.find({ category: categoryId }).lean()
        const categoryWithProducts = {
            ...category,
            products: products
        }
        res.success({ data: categoryWithProducts })
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}


const addProductCategory = async (req, res) => {
    try {
        const category = req.body
        const { categoryName } = category

        const existedCategory = await Category.find({ categoryName })
        if (existedCategory.length) {
            throw new createError(409, `${categoryName} Category is already existed.`)
        }

        const result = await Category.create(category)
        res.success({ data: result, message: "Product category added successfully." })

    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

const deleteCategory = async (req, res, next) => {
    const { categoryId } = req.body
    if (!isValidObjectId(categoryId)) {
        throw new createError(422, "Invalid Category Id.")
    }
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId)
        if (!deletedCategory) {
            throw new createError(404, "Category not found!!!");
        }
        return res.success({ message: "Successfully deleted the Category.", data: deletedCategory });
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

const updateCategory = async (req, res, next) => {
    const category = req.body
    const { categoryId } = req.body


    if (!isValidObjectId(categoryId)) {
        throw new createError(422, "Invalid Category Id.")
    }
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { $set: category },
            { new: true },
        )
        if (!updatedCategory) {
            throw new createError(404, "Category not found!!!");
        }
        return res.success({ message: "Successfully updated the Category.", data: updatedCategory });
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

module.exports = { getCategories, addProductCategory, getCategoryById, deleteCategory, updateCategory }