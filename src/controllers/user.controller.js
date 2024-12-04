const User = require("../models/user.model");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.success({ data: users })
    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.find({ _id: userId })
        if (user?.length) {
            res.success({ data: user })
        } else {
            res.error({ message: "No User found with this id." })
        }
    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}

const postUser = async (req, res) => {
    try {
        const user = req.body
        const { userName, email } = req.body

        const existedUser = await User.find({ $or: [{ userName: userName }, { email: email }] })
        if (existedUser?.length) {
            return res.error({ message: "User is already existed." })
        }

        const result = await User.create(user)
        res.success({ data: result, message: "User added successfully." })

    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body

        const deletedUser = await User.findOneAndDelete({ _id: userId })
        if (deletedUser) {
            res.success({ message: "User deleted successfully.", data: [deletedUser] })
        } else {
            res.error({ message: "No user found." })
        }
    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { userName, email, userId } = req.body
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { userName, email } },
            { upsert: true, new: true },
        );
        if ([updatedUser].length) {
            return res.success({ message: "User update successfully.", data: [updatedUser] })
        } else {
            return res.error({ message: "User not found with this id." })
        }
    } catch (error) {
        res.error({ statusCode: 500, message: error.message })
    }
}

module.exports = { getUsers, postUser, getUserById, deleteUser, updateUser }