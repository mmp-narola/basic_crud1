const express = require('express')
const { getUsers, postUser, getUserById, deleteUser, updateUser } = require('../controllers/user.controller')
const router = express.Router()


router.get("/", getUsers)
router.post("/", postUser)
router.get("/:userId", getUserById)
router.delete("/", deleteUser)
router.put("/", updateUser)

module.exports = router