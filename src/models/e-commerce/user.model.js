const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [6, "Minimum 6 characters required for password."],
        max: [10, "Maximum 10 characters are allowed for the password."]
    },
    phoneNumber: {
        type: Number,
    },
    age: {
        type: Number,
    }
}, { timestamps: true })

module.exports = mongoose.model("Appuser", userSchema)