import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useUpdateQuantityMutation } from "../features/api/cartApi";
import { updateProductQuantity } from "./productToLocalStorage";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../features/slice/cartSlice";

const QuantityUpdate = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const [updateQuantityMutation, { isLoading }] = useUpdateQuantityMutation();
  const dispatch = useDispatch();
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  useEffect(() => {
    if (props.productId && quantity > 1) {
      updateProductQuantity(props.productId, quantity);
      dispatch(updateQuantity({ productId: props.productId, quantity }));
    }
  }, [quantity]);

  useEffect(() => {
    const updateQuantity = async () => {
      if (props.cartId && quantity > 1) {
        await updateQuantityMutation({
          quantity,
          cartId: props.cartId,
        });
      }
    };
    updateQuantity();
  }, [quantity]);

  return (
    <div className="flex items-center">
      {isLoading ? (
        <>Updating...</>
      ) : (
        <>
          <Button className="text-xl" onClick={decreaseQuantity}>
            -
          </Button>
          <div className="mx-4"> Quantity: {quantity}</div>
          <Button className="text-xl" onClick={increaseQuantity}>
            +
          </Button>
        </>
      )}
    </div>
  );
};

export default QuantityUpdate;
