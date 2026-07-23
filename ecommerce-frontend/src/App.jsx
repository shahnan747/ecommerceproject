import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import ProductDetail from "./pages/ProductDetail"

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />



        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;