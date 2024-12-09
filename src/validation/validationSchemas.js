const { body, param } = require("express-validator")

const validationObject = {
    productValidationSchema: [
        body("title").notEmpty().withMessage("Title is required."),
        body("description").notEmpty().withMessage("Description is required."),
        body("price").notEmpty().withMessage("Price is required."),
        body("category").notEmpty().withMessage("Category is required.")
    ],
    productIdSchema: [
        body("productId").notEmpty().withMessage("ProductId is required.")
    ],
    queryProductIdSchema: [
        param("productId").notEmpty().withMessage("ProductId is required.")
    ],
    categoryValidationSchema: [
        body("categoryName").notEmpty().withMessage("Category Name is required."),
        body("description").notEmpty().withMessage("Description is required."),
    ],
    categoryIdSchema: [
        body("categoryId").notEmpty().withMessage("CategoryId is required.")
    ],
    queryCategoryIdSchema: [
        param("categoryId").notEmpty().withMessage("CategoryId is required.")
    ],
    userValidationSchema: [
        body("userName").notEmpty().withMessage("Username is required."),
        body("email").notEmpty().withMessage("Email is required."),
        body("password").notEmpty().withMessage("Password is required."),
    ],
    userIdSchema: [
        body("userId").notEmpty().withMessage("UserId is required.")
    ],
    queryUserIdSchema: [
        param("userId").notEmpty().withMessage("UserId is required.")
    ],
}


module.exports = validationObject