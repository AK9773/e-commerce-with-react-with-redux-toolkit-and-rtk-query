import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useSelector } from "react-redux";

const CartSummary = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  let className = "flex justify-between text-2xl mb-2";
  const carts = useSelector((state) => state.cart.cartData);
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let amount = 0;
    let discount = 0;
    let tax = 0;
    if (userData != null) {
      carts.forEach((cart) => {
        amount += cart.productDetails.price * cart.quantity;
        discount += (cart.productDetails?.price * 10) / 100;
      });
    } else {
      carts.forEach((cart) => {
        amount += cart.price * cart.quantity;
        discount += (cart.price * 10) / 100;
      });
    }

    setAmount(amount);
    setDiscount(discount);
    setTax(amount / 20);
    setTotalAmount(amount - discount + tax);
  }, [carts, userData]);

  return (
    <div>
      <h1 className="text-center text-4xl my-4 text-blue-800">Cart Summary</h1>
      <div className="m-auto w-8/12 border-blue-500 border-2 rounded-md p-4 bg-[#f1fbf3]">
        <p className={`${className}`}>
          <span className="mr-8">Amount</span> <span>{amount}</span>
        </p>
        <p className={`${className}`}>
          <span className="mr-8">Tax</span> <span>{tax}</span>
        </p>
        <p className={`${className}`}>
          <span className="mr-8">Discount</span> <span>{discount}</span>
        </p>
        <p className={`${className}`}>
          <span className="mr-8">Delivery</span> <span>100</span>
        </p>
        <hr className="border-1 border-blue-600 rounded-lg my-4" />
        <p className="flex justify-between text-2xl my-4">
          <span className="mr-8">Total Rs:</span> <span>{totalAmount}</span>
        </p>
        <hr className="border-1 border-blue-600 rounded-lg my-4" />
        {userData ? (
          <Button
            onClick={() => {
              navigate("/order");
            }}
            className="mt-4 w-full"
          >
            Buy Now
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="mt-4 w-full"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
