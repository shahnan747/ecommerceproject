const Product = require("../models/product");
const uploadCloudinary = require("../utilities/imageUpload");

exports.createProduct = async (req, res) => {
    try {
      const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
  
        image: req.file
          ? `/uploads/${req.file.filename}`
          : null
      });
  
      res.status(201).json(product);
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

exports.getProducts = async (req, res, next) => {

    try {

        let query = {};

        if (req.query.name) {
            query.name = {
                $regex: req.query.name,
                $options: "i"
            };
        }

        if (req.query.category) {
            query.category = req.query.category;
        }

        let products = await Product.find(query);

        if (req.query.sort === "asc") {
            products.sort((a, b) => a.price - b.price);
        }

        if (req.query.sort === "desc") {
            products.sort((a, b) => b.price - a.price);
        }

        res.json(products);

    } catch (error) {

        next(error);

    }
};

exports.getProductById = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {

        const error = new Error("Product not found");
        error.statusCode = 404;

        return next(error);
    }

    res.json(product);
};

exports.updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id);
  
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
  
      product.title =
        req.body.title || product.title;
  
      product.description =
        req.body.description ||
        product.description;
  
      product.price =
        req.body.price || product.price;
  

      if (req.file) {
        product.image = `/uploads/${req.file.filename}`;
      }
  
      await product.save();
  
      res.json(product);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
        message: "Product Deleted"
    });
};