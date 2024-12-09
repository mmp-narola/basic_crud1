const User = require("../../models/e-commerce/user.model");
const createError = require('http-errors')
const bcrypt = require("bcryptjs");
const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken")

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.success({ data: users })
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

const registerUser = async (req, res) => {
    try {
        const user = req.body
        const { userName, email, password } = user
        const existedUser = await User.find({ $or: [{ userName: userName }, { email: email }] })
        if (existedUser.length) {
            throw new createError(409, "User is already existed.")
        }
        const hashedPass = await bcrypt.hash(password, 12);

        const result = await User.create({ ...user, password: hashedPass })
        res.success({ user: result, message: "Successfully register the user." })

    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

const loginUser = async (req, res) => {
    const user = req.body
    const { email, password } = user
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new createError(404, "User not found.");
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {

            throw new createError(401, "Invalid password.");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.success({ data: { user, authToken: token } });
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
}

module.exports = { getUsers, registerUser, loginUser }
