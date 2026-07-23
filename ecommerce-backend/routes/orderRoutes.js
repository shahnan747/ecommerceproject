const express = require("express");

const router = express.Router();

const {
    createOrder,
    getOrders,
    getMyOrders,
    updateOrderStatus
} = require("../controllers/orderController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

// User places an order
router.post(
    "/",
    protect,
    authorize("user", "admin"),
    createOrder
);


router.get(
    "/",
    protect,
    getOrders
);

router.get(
    "/myorders",
    protect,
    authorize("user", "admin"),
    getMyOrders
  );


router.put(
    "/:id",
    protect, 
    authorize("admin"), 
    updateOrderStatus
);



module.exports = router; 


