const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model("Category", categorySchema)