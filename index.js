const express = require("express");
const { connectDB } = require("./db");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/user.routes");

const app = express()

dotenv.config({
    path: './.env'
})

app.use(express.json());

app.use("/api/user", userRoutes)


app.get("/", (req, res, next) => {
    res.json({ message: "First get request" });
})


connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
