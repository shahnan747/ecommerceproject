const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analyticsController");

const {protect} = require("../middleware/authMiddleware");

router.get(
    "/recommendations",
    protect,
    analyticsController.recommendProducts
);

module.exports = router;