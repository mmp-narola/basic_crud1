const { isValidObjectId } = require("mongoose");
const Product = require("../../models/e-commerce/product.model");
const Category = require("../../models/e-commerce/productCategory.model");
const requiredFieldsValidator = require("../../middleware/requiredFieldValidator");

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.success({ data: categories })
    } catch (error) {
        res.error({ statusCode: 500, error: error.message })
    }
}

const getCategoryById = async (req, res) => {
    const { categoryId } = req.params
    try {
        if (!isValidObjectId(categoryId)) {
            return res.error({ error: "Invalid Category Id." })
        }
        const category = await Category.findOne({ _id: categoryId }).lean()
        if (!category) {
            return res.error({ error: "Category not found" })
        }

        const products = await Product.find({ category: categoryId }).lean()
        const categoryWithProducts = {
            ...category,
            products: products
        }
        res.success({ data: categoryWithProducts })
    } catch (error) {
        res.error({ statusCode: 500, error: error.message })
    }
}


const addProductCategory = async (req, res) => {
    try {
        const category = req.body
        const { categoryName } = category

        const existedCategory = await Category.find({ categoryName })
        if (existedCategory.length) {
            return res.error({ error: `${categoryName} Category is already existed.` })
        }

        const result = await Category.create(category)
        res.success({ data: result, message: "Product category added successfully." })

    } catch (error) {
        res.error({ statusCode: 500, error: error.message })
    }
}

const deleteCategory = async (req, res, next) => {
    const { categoryId } = req.body
    if (!categoryId) {
        return res.error({ statusCode: 422, error: "Kindy provide Category Id." })
    }
    if (!isValidObjectId(categoryId)) {
        return res.error({ error: "Invalid Category Id." })
    }
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId)
        if (!deletedCategory) {
            return res.error({ statusCode: 404, error: "Category not found!!!" });
        }
        return res.success({ message: "Successfully deleted the Category.", data: deletedCategory });
    } catch (error) {
        return res.error({ statusCode: 500, error: error.message })
    }
}

const updateCategory = async (req, res, next) => {
    const category = req.body
    const { categoryId, categoryName, description } = req.body

    const error = requiredFieldsValidator({ categoryId, categoryName, description })

    if (error) {
        return res.error({ statusCode: 422, error: error });
    }
    if (!isValidObjectId(categoryId)) {
        return res.error({ error: "Invalid Category Id." })
    }
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { $set: category },
            { new: true },
        )
        if (!updatedCategory) {
            return res.error({ statusCode: 404, error: "Category not found!!!" });
        }
        return res.success({ message: "Successfully updated the Category.", data: updatedCategory });
    } catch (error) {
        return res.error({ statusCode: 500, error: error.message })
    }
}

module.exports = { getCategories, addProductCategory, getCategoryById, deleteCategory, updateCategory }