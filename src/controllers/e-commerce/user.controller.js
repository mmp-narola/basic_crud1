const User = require("../../models/e-commerce/user.model");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.success({ data: users })
    } catch (error) {
        res.error({ statusCode: 500, error: error.message })
    }
}

const addUser = async (req, res) => {
    try {
        const user = req.body
        const { userName, email } = user

        const existedUser = await User.find({ $or: [{ userName: userName }, { email: email }] })
        if (existedUser.length) {
            return res.error({ error: "User is already existed." })
        }

        const result = await User.create(user)
        res.success({ user: result, message: "Successfully added the user." })

    } catch (error) {
        res.error({ statusCode: 500, error: error.message })
    }
}

module.exports = { getUsers, addUser }
