const express = require('express')
const { getUsers, registerUser, loginUser } = require('../../controllers/e-commerce/user.controller')
const validationObject = require('../../validation/validationSchemas')
const verifyToken = require('../../middleware/verifyToken')
const router = express.Router()


router.get("/", verifyToken, getUsers)
router.post("/register", validator(validationObject.userValidationSchema), registerUser)
router.post("/login", loginUser)

module.exports = router