const Order = require("../models/order");

exports.createOrder = async (req, res) => {
    try {
  
      const order = await Order.create({
        user: req.user.id,
        products: req.body.products,
        totalPrice: req.body.totalPrice,
      });
  
      res.status(201).json(order);
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message
      });
    }
};

exports.getOrders = async (req,res) => {
    const orders = await Order.find()
        .populate("user")
        .populate("products");

    res.json(orders);
};

exports.getMyOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.id })
          .populate("products.product");
  
      res.json(orders);
  
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

// UPDATE STATUS (ADMIN)
exports.updateOrderStatus = async (req, res) => {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
         returnDocument: "after"
      }
    );
  
    res.json(order);
};