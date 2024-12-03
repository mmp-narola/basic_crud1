const User = require("../models/user.model");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({ users })
    } catch (error) {
        console.log('error :>> ', error.message);
        res.status(500).json({ message: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.find({ _id: userId })
        res.status(200).json({ user })
    } catch (error) {
        console.log('error :>> ', error.message);
        res.status(500).json({ message: error.message })
    }
}

const postUser = async (req, res) => {
    try {
        const user = req.body
        const { userName, email } = req.body

        const existedUser = await User.find({ $or: [{ userName: userName }, { email: email }] })
        if (existedUser.length) {
            res.status(404).json({ message: "User is already existed." })
            return
        }

        const result = await User.create(user)
        res.status(200).json({ user: result })

    } catch (error) {
        console.log('error :>> ', error.message);
        res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body

        const existedUser = await User.find({ _id: userId })
        if (existedUser.length) {
            await User.deleteOne({ _id: existedUser[0]._id })
            res.status(200).json({ message: "User deleted successfully." })
        } else {
            res.status(404).json({ message: "No user found." })
            return
        }
    } catch (error) {
        console.log('error :>> ', error.message);
        res.status(500).json({ message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { userName, email, userId } = req.body

        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { userName, email } },
            { upsert: true, new: true },
        );
        res.status(200).json({ message: "User update successfully." })
        return

    } catch (error) {
        console.log('error :>> ', error.message);
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getUsers, postUser, getUserById, deleteUser, updateUser }