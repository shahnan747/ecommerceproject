const Product = require("../models/product");

exports.getRecommendations = async (
    userId
) => {

    const products = await Product.find();

    const recommendedProducts =
        products.slice(0, 5);

    return recommendedProducts;
};