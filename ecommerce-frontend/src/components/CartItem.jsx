const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      {/* Product Image */}
      <div className="flex items-center gap-4">
        <img
          src={`${import.meta.env.VITE_SERVER_URL}${item.image}`}
          alt={item.title}
          className="w-20 h-20 object-cover rounded"
        />

        <div>
          <h2 className="font-semibold text-lg">{item.title}</h2>
          <p className="text-gray-500">₹{item.price}</p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onQuantityChange(item._id, item.quantity - 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => onQuantityChange(item._id, item.quantity + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item._id)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;