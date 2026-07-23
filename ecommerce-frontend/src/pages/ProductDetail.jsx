import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { fetchSingleProduct } from "../redux/thunks/productThunks";

import { addToCart } from "../redux/slices/CartSlice" 

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.products
  );

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
     console.log("Button clicked");
  console.log(product);
    if (!product?._id) return;
    dispatch(addToCart({...product,
      quantity:1,}
    ))

    console.log("Dispatched");
  };

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  if (error) {
    return (
      <h2 className="text-center mt-10 text-red-500">
        {error}
      </h2>
    );
  }

  if (!product) {
    return (
      <h2 className="text-center mt-10 text-red-500">
        Product not found
      </h2>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          <img
            src={`${SERVER_URL}${product?.image}`}
            alt={product?.name}
            className="w-full rounded shadow"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">
            {product?.name}
          </h1>

          <p className="text-gray-600 mb-6">
            {product?.description}
          </p>

          <h2 className="text-3xl font-bold mb-6">
            ₹{product?.price}
          </h2>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 rounded"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;