import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";


import { logoutUser } from "../redux/thunks/authThunks"; 

const Navbar = () => {

  const dispatch = useDispatch();

  const {cartItems} = useSelector(
    (state) => state.cart
  );

  const { userInfo } = useSelector((state) => state.auth);
 
  

  return (

    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <Link
        to="/"
        className="text-3xl font-bold"
      >
        ShopSphere
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart ({cartItems.length})
        </Link>

        <Link to="/orders">
          Orders
        </Link>

        <Link to="/contact">
          Contact
        </Link>

        {userInfo ? (

            <button
              onClick={() => dispatch(logoutUser())}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>

          ) : (

            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </Link>
          )
        }

      </div>

    </nav>
  );
};

export default Navbar;