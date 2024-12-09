const { isValidObjectId } = require("mongoose");
const Product = require("../../models/e-commerce/product.model");
const createError = require('http-errors')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate({ path: "category", model: "Category" })
        res.success({ data: products })
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

const addProduct = async (req, res) => {
    try {
        const product = req.body
        const { title } = product
        const existedProduct = await Product.find({ title })
        if (existedProduct.length) {
            throw new createError(404, "Product not found!....")
        }
        const result = await Product.create(product)
        res.success({ data: result, message: "Successfully added the product." })
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

const deleteProduct = async (req, res) => {
    const { productId } = req.body
    try {
        if (!isValidObjectId(productId)) {
            throw new createError(422, "Invalid Product Id.")
        }

        const deletedProduct = await Product.findByIdAndDelete(productId)
        if (!deletedProduct) {
            throw new createError(404, "Product not found!....")
        }

        res.success({ message: "Successfully deleted the Product.", data: deletedProduct });
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

const getProductById = async (req, res) => {
    const { productId } = req.params
    try {
        if (!isValidObjectId(productId)) {
            throw new createError(422, "Invalid Product Id.")
        }
        const product = await Product.find({ _id: productId }).populate({ path: "category", model: "Category" })
        if (!product.length) {
            throw new createError(404, "Product not found!!!")
        }
        return res.success({ data: product })
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

const updateProduct = async (req, res) => {
    const product = req.body
    const { productId } = req.body

    try {
        if (!isValidObjectId(productId)) {
            throw new createError(422, "Invalid Product Id.")
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: product },
            { new: true },
        );
        if (!updatedProduct) {
            throw new createError(404, "Product not found!!!")
        }
        res.success({ message: "Successfully update the Product.", data: [updatedProduct] })
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

module.exports = { getProducts, addProduct, deleteProduct, getProductById, updateProduct }
