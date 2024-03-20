import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg p-2 w-1/6 m-4 h-[350px]">
      <img
        className="w-full h-3/4 p-2 object-contain"
        src={product.thumbnail}
        alt={product.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          ${product.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
