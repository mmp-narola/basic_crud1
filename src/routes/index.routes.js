const express = require('express')
const router = express.Router()


router.use('/product', require("./e-commerce/product.routes"))
router.use('/category', require("./e-commerce/productCategory.routes"))
router.use('/auth', require("./e-commerce/user.routes"))

module.exports = router