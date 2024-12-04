const mongoose = require("mongoose")


const orderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appuser"
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)