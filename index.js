const express = require("express");
const { connectDB } = require("./db");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/user.routes");
const productRoutes = require("./src/routes/e-commerce/product.routes")
const productCategoryRoutes = require("./src/routes/e-commerce/productCategory.routes")
const appUserRoutes = require("./src/routes/e-commerce/user.routes")
var cors = require('cors');
const responseFormatter = require("./src/middleware/responseFormatter");

const app = express()

dotenv.config({
    path: './.env'
})

app.use(cors())
app.use(express.json());
app.use(responseFormatter);

app.use("/api/user", userRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/category", productCategoryRoutes)
app.use("/api/v1/user", appUserRoutes)


app.get("/", (req, res, next) => {
    res.json({ message: "First get request" });
})


connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
