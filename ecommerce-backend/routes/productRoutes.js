const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const upload = require("../config/multer");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

router.post(
    "/",
    protect,
    authorize("admin"),
    upload.single("image"),
    productController.createProduct
  );

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.put(
    "/:id",
    protect,
    authorize("admin"),
    upload.single("image"),
    productController.updateProduct
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    productController.deleteProduct
);

module.exports = router;

