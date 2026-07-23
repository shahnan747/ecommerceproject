import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";

import axiosInstance from "../api/axiosInstance";

const Home = () => {

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const res = await axiosInstance.get("/products");

      setProducts(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter(product =>
    product?.name?.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  return (

    <div className="p-8">

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-4 border rounded-xl bg-white"

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {
          filteredProducts.map(product => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))
        }

      </div>

    </div>
  );
};

export default Home;