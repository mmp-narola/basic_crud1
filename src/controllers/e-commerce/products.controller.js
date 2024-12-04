const { isValidObjectId } = require("mongoose");
const Product = require("../../models/e-commerce/product.model");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate({ path: "category", model: "Category" })
        res.success({ data: products })
    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}

const addProduct = async (req, res) => {
    try {
        const product = req.body
        const { title } = product

        const existedProduct = await Product.find({ title })
        if (existedProduct.length) {
            res.error({ message: "Product with this name is already existed." })
        }
        const result = await Product.create(product)
        res.success({ data: [result], message: "Successfully added the product." })
    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const { productId } = req.body
    try {
        if (!isValidObjectId(productId)) {
            return res.error({ message: "Invalid Product Id." })
        }

        const deletedProduct = await Product.find({ _id: productId })
        if (deletedProduct?.length) {
            return res.success({ message: "Successfully deleted the Product.", data: deletedProduct })
        } else {
            return res.error({ statusCode: 408, message: "Product not found!!!" })
        }
    } catch (error) {
        return res.error({ statusCode: 500, message: error.message })
    }
}

const getProductById = async (req, res) => {
    const { productId } = req.params
    try {
        if (!isValidObjectId(productId)) {
            return res.error({ message: "Invalid Product Id." })
        }
        const product = await Product.find({ _id: productId }).populate({ path: "category", model: "Category" })
        res.success({ data: product })
    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = req.body
        const { productId } = req.body
        if (!isValidObjectId(productId)) {
            return res.error({ message: "Invalid Product Id." })
        }
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productId },
            { $set: product },
            { upsert: true, new: true },
        );
        res.success({ message: "Successfully update the Product.", data: [updatedProduct] })
    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}

module.exports = { getProducts, addProduct, deleteProduct, getProductById, updateProduct }
