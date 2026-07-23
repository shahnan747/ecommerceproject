import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-bold">MyShop</h2>

        <p className="mt-2 text-gray-400">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </p>

        <div className="flex justify-center gap-6 mt-4">
          <a href="/" className="hover:text-gray-300">
            Home
          </a>

          <a href="/products" className="hover:text-gray-300">
            Products
          </a>

          <a href="/cart" className="hover:text-gray-300">
            Cart
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;