import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../redux/thunks/orderThunks";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

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

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-6 shadow"
            >
              <h2 className="font-bold text-xl mb-2">
                Order ID: {order._id}
              </h2>

              <p className="mb-2">
                Total Amount: ₹{order.totalPrice}
              </p>

              <p className="mb-4">
                Status: {order.status}
              </p>

              <div>
                <h3 className="font-semibold mb-2">
                  Products:
                </h3>

                {order.products?.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between border-b py-2"
                  >
                    <span>{item.product?.name}</span>

                    <span>
                      {item.quantity} × ₹{item.product?.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;