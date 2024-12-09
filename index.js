const express = require("express");
const { connectDB } = require("./db");
var cors = require('cors');
var morgan = require('morgan')
const responseFormatter = require("./src/middleware/responseFormatter");
const { SERVER_PORT } = require("./constants");

const app = express()


app.use(morgan('dev'))
app.use(cors())
app.use(express.json());
app.use(responseFormatter);
global.validator = require("./src/validation/validator")



app.use("/api/v1", require("./src/routes/index.routes"))


// app.all('*', async (req, res) => {
//     res.status(404).json({ error: "Invalid API URL!!!" })
// });

connectDB().then(() => {
    app.listen(SERVER_PORT || 8000, () => {
        console.log(`Server is running at port : ${SERVER_PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
