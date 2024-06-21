import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useGetProductListQuery } from "../features/api/productApi";
import Loader from "./Loader";
import Banner from "./Banner";

const Home = () => {
  const { data, error, isLoading, isError } =
    useGetProductListQuery("?limit=100");
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <Banner />
      {data && data?.products.productList.length ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 place-items-center px-4">
          {data &&
            data?.products.productList.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      ) : (
        <>
          <h2 className="text-center text-2xl mt-20">No Products</h2>
        </>
      )}
    </>
  );
};

export default Home;
