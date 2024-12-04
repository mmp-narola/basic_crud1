const express = require('express')
const { getUsers, addUser } = require('../../controllers/e-commerce/user.controller')
const router = express.Router()


router.get("/", getUsers)
router.post("/", addUser)
// router.get("/:userId", )

module.exports = router