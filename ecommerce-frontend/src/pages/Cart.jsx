import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} from "../redux/slices/CartSlice";

import CartItem from "../components/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleOrderNow = () => {
    navigate("/contact");
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onRemove={handleRemove}
                onQuantityChange={(id, quantity) => {
                  if (quantity > item.quantity) {
                    dispatch(increaseQty(id));
                  } else {
                    dispatch(decreaseQty(id));
                  }
                }}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Total: ₹{totalPrice}
            </h2>

            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-6 py-3 rounded"
            >
              Clear Cart
            </button>

            <button
                onClick={handleOrderNow}
                className="bg-green-600 text-white px-6 py-3 rounded font-semibold"
              >
                Order Now
              </button>
          </div>
      
        </>
      )}
    </div>
  );
};

export default Cart;