import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "../Hero/Hero";
import Products from "../Products/Products";
import FeaturesCard from "../FeaturesCard/FeaturesCard";
import StatsCard from "../StatsCard/StatsCard";

export default function Home() {
  let [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const response = await fetch("https://fakestoreapi.com/products?limit=12");
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
      setProducts(data);

      } catch{
        console.error("Error fetching product:", error);
        setError(error.message); // Update error state
      }
      
      
    };
    fetchProducts();
  }, []);

    if (error) {
    return <div>Error: {error}</div>; // Render error message if there is an error
  }

  return (
    <>
      <Hero />
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs text-orange-700 tracking-widest font-medium title-font mb-1">
          PRODUCTS
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Most Popular Products
        </h1>
      </div>
      {products.length > 0 ? (
        <Products products={products} />
      ) : (
        <div>Loading...</div>
      )}
      <FeaturesCard />
      <StatsCard />
    </>
  );
}
