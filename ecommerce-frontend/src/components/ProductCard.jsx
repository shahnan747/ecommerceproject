import { useDispatch } from "react-redux";

import { addToCart } from "../redux/slices/CartSlice" 

import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();

  return (

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">

      <img
        src={`${import.meta.env.VITE_SERVER_URL}${product.image}`}
        alt={product.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">

        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2">
          ₹{product.price}
        </p>

        <div className="flex gap-2 mt-4">

          <Link
            to={`/product/${product._id}`}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            View
          </Link>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;