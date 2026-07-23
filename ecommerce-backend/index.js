require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/dbConnection");


const path = require("path");
const app = express();

const errorHandler = require("./middleware/errorHandler");

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
});