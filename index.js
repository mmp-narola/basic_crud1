const express = require("express");
const { connectDB } = require("./db");
const dotenv = require("dotenv");
var cors = require('cors');
var morgan = require('morgan')
const responseFormatter = require("./src/middleware/responseFormatter");

const app = express()

dotenv.config({
    path: './.env'
})

app.use(morgan(':method :url :status :response-time ms'))

app.use(cors())
app.use(express.json());
app.use(responseFormatter);

app.use("/api/v1", require("./src/routes/index.routes"))


app.get("/", (req, res, next) => {
    res.json({ message: "First get request" });
})


connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
