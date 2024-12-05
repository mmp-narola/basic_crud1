const { isValidObjectId } = require("mongoose");
const Product = require("../../models/e-commerce/product.model");
const requiredFieldsValidator = require("../../middleware/requiredFieldValidator");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate({ path: "category", model: "Category" })
        res.success({ data: products })
    } catch (error) {
        res.error({ statusCode: 500, error: error.message })
    }
}

const addProduct = async (req, res) => {
    try {
        const product = req.body
        const { title } = product

        const existedProduct = await Product.find({ title })
        if (existedProduct.length) {
            res.error({ error: "Product with this name is already existed." })
        }
        const result = await Product.create(product)
        res.success({ data: [result], message: "Successfully added the product." })
    } catch (error) {
        res.error({ statusCode: 500, error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const { productId } = req.body
    if (!productId) {
        return res.error({ statusCode: 422, error: "Kindy provide Product Id." })
    }
    try {
        if (!isValidObjectId(productId)) {
            return res.error({ error: "Invalid Product Id." })
        }

        const deletedProduct = await Product.findByIdAndDelete(productId)
        if (!deletedProduct) {
            return res.error({ statusCode: 404, error: "Product not found!!!" });
        }
        return res.success({ message: "Successfully deleted the Product.", data: deletedProduct });

    } catch (error) {
        return res.error({ statusCode: 500, error: error.message })
    }
}

const getProductById = async (req, res) => {
    const { productId } = req.params
    if (!productId) {
        return res.error({ statusCode: 422, error: "Kindy provide Product Id." })
    }
    try {
        if (!isValidObjectId(productId)) {
            return res.error({ error: "Invalid Product Id." })
        }
        const product = await Product.find({ _id: productId }).populate({ path: "category", model: "Category" })
        res.success({ data: product })
    } catch (error) {
        res.error({ statusCode: 500, error: error.message })
    }
}

const updateProduct = async (req, res) => {
    const product = req.body
    const { productId, title, description, price, category } = req.body

    const error = requiredFieldsValidator({ productId, title, description, price, category })

    if (error) {
        return res.error({ statusCode: 422, error: error });
    }
    try {
        if (!isValidObjectId(productId)) {
            return res.error({ error: "Invalid Product Id." })
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: product },
            { new: true },
        );
        if (!updatedProduct) {
            return res.error({ statusCode: 404, error: "Product not found!!!" });
        }
        res.success({ message: "Successfully update the Product.", data: [updatedProduct] })
    } catch (error) {
        res.error({ statusCode: 500, error: error.message })
    }
}

module.exports = { getProducts, addProduct, deleteProduct, getProductById, updateProduct }
