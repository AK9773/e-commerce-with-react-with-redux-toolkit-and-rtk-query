import React, { useEffect, useState } from "react";
import Button from "./Button";
import { removeFromCart } from "../features/slice/cartSlice";
import { removeProductFromLocalStorage } from "./productToLocalStorage";
import { useDispatch } from "react-redux";
import QuantityUpdate from "./QuantityUpdate";
import { useDeleteCartMutation } from "../features/api/cartApi";

const CartItem = ({ product, cartId, quantity }) => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [deleteCart] = useDeleteCartMutation();

  const removeHandler = () => {
    if (!userId) {
      removeProductFromLocalStorage(product._id);
      dispatch(removeFromCart(product._id));
    } else {
      const deleteCartItem = async () => {
        await deleteCart(cartId);
      };
      deleteCartItem();
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 h-48 w-[80%] mx-auto my-4 bg-[#d5f3db] border-blue-800 border-2 rounded-md shadow-xl">
        <div className=" col-span-1">
          <img
            className="h-[100%] w-[100%] object-contain mx-auto p-4 hover:scale-105"
            src={product.thumbnail}
            alt="product.name"
          />
        </div>
        <div className=" col-span-3">
          <div>
            <p className="text-2xl mt-4 ml-2">{product.name} </p>
          </div>

          <div className="mt-8 flex justify-between px-8">
            {userId ? (
              <>
                <QuantityUpdate cartId={cartId} quantity={quantity} />
              </>
            ) : (
              <>
                <QuantityUpdate productId={product._id} quantity={quantity} />
              </>
            )}

            <div className="text-2xl ">Price: ${product.price}</div>
            <Button
              bgColor="from-pink-500 via-pink-600 to-pink-700"
              onClick={removeHandler}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
