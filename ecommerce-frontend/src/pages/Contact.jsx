// 

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../redux/thunks/orderThunks";
import { clearCart } from "../redux/slices/CartSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { loading: orderLoading } = useSelector((state) => state.orders);

  const isOrderMode = cartItems.length > 0;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [error, setError] = useState("");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isOrderMode) {
      // Plain contact form behavior
      console.log(formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "", street: "", city: "", state: "", zip: "", country: "" });
      return;
    }

    // Order mode: validate shipping fields
    if (!formData.name || !formData.phone || !formData.street || !formData.city || !formData.zip || !formData.country) {
      setError("Please fill all required fields, including shipping address.");
      return;
    }

    const orderData = {
      products: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.images?.[0] || item.image || "",
        quantity: item.quantity,
      })),

      totalPrice,

      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
      },
      paymentMethod: "COD",
    };

    const result = await dispatch(createOrder(orderData));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(clearCart());
      alert("Order placed successfully!");
      navigate("/orders");
    } else {
      setError(result.payload?.message || result.payload || "Failed to place order");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {isOrderMode ? "Shipping Details" : "Contact Us"}
      </h1>

      {isOrderMode && (
        <p className="text-center text-gray-600 mb-6">
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} — Total: ₹{totalPrice}
        </p>
      )}

      {error && (
        <p className="max-w-xl mx-auto text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow-md rounded p-6"
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            {isOrderMode ? "Phone" : "Email"}
          </label>
          <input
            type={isOrderMode ? "tel" : "email"}
            name={isOrderMode ? "phone" : "email"}
            value={isOrderMode ? formData.phone : formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        {isOrderMode && (
          <>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Street Address</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-medium">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>
            </div>
          </>
        )}

        {!isOrderMode && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            ></textarea>
          </div>
        )}

        <button
          type="submit"
          disabled={orderLoading}
          className="bg-black text-white px-6 py-3 rounded w-full disabled:opacity-50"
        >
          {isOrderMode
            ? orderLoading ? "Placing Order..." : `Place Order — ₹${totalPrice}`
            : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;