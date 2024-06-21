import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.cartData);

  useEffect(() => {
    if (!carts.length) {
      navigate("/");
    }
  }, [carts]);

  return (
    <div className="grid md:grid-cols-3 ">
      <div className="md:col-span-2">
        {userId ? (
          <>
            {carts?.map((cart) => (
              <CartItem
                product={cart.productDetails}
                cartId={cart._id}
                quantity={cart.quantity}
                key={cart._id}
              />
            ))}
          </>
        ) : (
          <>
            {carts?.map((product) => (
              <CartItem
                product={product}
                quantity={product.quantity}
                key={product._id}
              />
            ))}
          </>
        )}
      </div>

      <div className="bg-pink-600 md:col-span-1">
        <p></p>
        <div></div>
      </div>
    </div>
  );
};

export default Cart;
