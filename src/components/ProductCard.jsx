import React from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import AddOrRemoveFromCart from "./AddOrRemoveFromCart";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const item = { ...product, quantity: 1 };

  const details = () => {
    navigate(`/product/${product?._id}`);
  };

  return (
    <>
      <div className="w-[240px] rounded shadow-lg bg-[#baf7fa] overflow-hidden ">
        <div className="flex justify-center items-center">
          <Link to={`/product/${product?._id}`}>
            <img
              className="h-44 w-40 object-contain p-2 hover:scale-110"
              src={product.thumbnail}
              alt={product.name}
            />
          </Link>
        </div>
        <div className="font-bold text-xl h-8 overflow-hidden px-4 mb-2">
          {product.name}
        </div>

        <div className="flex justify-between h-8 px-4">
          <span className="grid place-content-center bg-gray-200 rounded px-2  text-sm font-semibold text-gray-700">
            {product.category}
          </span>
          <span className="grid place-content-center bg-gray-200 rounded px-2 text-sm font-semibold text-gray-700">
            Price: ${product.price}
          </span>
        </div>
        <div className="flex justify-between items-center px-4 py-2 h-12 my-4">
          <AddOrRemoveFromCart product={item} />
          <Button onClick={details}>View Details</Button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
