import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useGetProductListQuery } from "../features/productApi";

const Home = () => {
  const response = useGetProductListQuery("?limit=20");

  return (
    <div className="flex flex-wrap justify-around ">
      {response.data?.products.productList.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Home;
