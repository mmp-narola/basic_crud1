const mongoose = require("mongoose");
const { MONGODB_URI } = require("./constants");


const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGODB_URI}`)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

module.exports = { connectDB }