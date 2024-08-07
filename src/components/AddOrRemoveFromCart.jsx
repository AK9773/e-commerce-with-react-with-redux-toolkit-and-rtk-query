import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddCartMutation,
  useDeleteCartMutation,
} from "../features/api/cartApi";
import {
  addProductToLocalStorage,
  removeProductFromLocalStorage,
} from "./productToLocalStorage";
import { addToCart, removeFromCart } from "../features/slice/cartSlice";
import Button from "./Button";

const AddOrRemoveFromCart = ({ product }) => {
  const userId = localStorage.getItem("userId");
  const cart = useSelector((state) => state.cart.cartData);
  const [addCart] = useAddCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const dispatch = useDispatch();

  const [user_id, setUser_id] = useState(userId);

  useEffect(() => {
    setUser_id(userId);
  }, [userId]);

  const addCartHandler = async () => {
    if (user_id) {
      addCart({ productId: product._id, quantity: product.quantity });
    } else {
      addProductToLocalStorage(product);
      dispatch(addToCart(product));
    }
  };

  const removeCartHandler = async () => {
    if (userId) {
      const filteredCart = cart.filter(
        (item) => item.productDetails?._id === product?._id
      );
      await deleteCart(filteredCart[0]._id);
    } else {
      removeProductFromLocalStorage(product._id);
    }
    dispatch(removeFromCart(product._id));
  };

  return (
    <div>
      {userId ? (
        <>
          {cart?.some((item) => item.productDetails?._id === product?._id) ? (
            <Button
              bgColor="from-pink-500 via-pink-600 to-pink-700"
              onClick={removeCartHandler}
            >
              Remove
            </Button>
          ) : (
            <Button onClick={addCartHandler}>Add</Button>
          )}
        </>
      ) : (
        <>
          {cart?.some((item) => item._id === product?._id) ? (
            <Button
              bgColor="from-pink-500 via-pink-600 to-pink-700"
              onClick={removeCartHandler}
            >
              Remove
            </Button>
          ) : (
            <Button onClick={addCartHandler}>Add</Button>
          )}
        </>
      )}

      {/* {userData && userData.role === "seller" && (
            <Button
              onClick={() => {
                deleteMutation(product._id);
              }}
            >
              {isLoading ? <>Wait..</> : <>Delete</>}
            </Button>
          )} */}
    </div>
  );
};

export default AddOrRemoveFromCart;
