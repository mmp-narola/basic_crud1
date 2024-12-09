const dotenv = require("dotenv");

dotenv.config({
    path: './.env'
})

const DB_NAME = "basic_crud"
const SERVER_PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI


module.exports = { DB_NAME, SERVER_PORT, MONGODB_URI }