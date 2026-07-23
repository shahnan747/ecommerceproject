require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

const app = express();


connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
    "/api/auth",
    require("./routes/authenticationRoutes")
);

app.use(
    "/api/products",
    require("./routes/productRoutes")
);

app.use(
    "/api/profile",
    require("./routes/userProfileRoutes")
);

app.use(
    "/api/orders",
    require("./routes/orderRoutes")
);

app.use(
    "/api/analytics",
    require("./routes/analyticsRoutes")
);

app.use(errorHandler);

module.exports = app;
