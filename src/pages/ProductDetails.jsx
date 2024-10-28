import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductdetailsQuery } from "../features/api/productApi";
import Loader from "../components/Loader";
import AddOrRemoveFromCart from "../components/AddOrRemoveFromCart";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, error, isLoading, isError } =
    useGetProductdetailsQuery(productId);

  const cart = useSelector((state) => state.cart.cartData);
  const userData = useSelector((state) => state.cart.userData);
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState(null);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseIndex = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    } else if (index === 0) {
      setIndex(product?.images.length - 1);
    }
  };

  const increaseIndex = () => {
    if (index < product?.images.length - 1) {
      setIndex((prev) => prev + 1);
    } else if (index === product?.images.length - 1) {
      setIndex(0);
    }
  };

  // const getProductQuantity = () => {
  //   if (userData) {
  //     const filteredArrayOfCart = cart.filter(
  //       (item) => item.productDetails._id === productId
  //     );
  //     if (filteredArrayOfCart.length > 0) {
  //       return filteredArrayOfCart[0].productDetails.quantity;
  //     }
  //   } else {
  //     const filteredArrayOfLocalCart = cart.filter(
  //       (item) => item._id === productId
  //     );
  //     if (filteredArrayOfLocalCart.length > 0) {
  //       return filteredArrayOfLocalCart[0].quantity;
  //     }
  //   }
  //   return 1;
  // };

  useEffect(() => {
    // const quantity = getProductQuantity();
    // setQuantity(quantity);
    if (data) {
      setProduct({ ...data.product, quantity: quantity });
    }
  }, [data?.product._id, quantity]);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (isError) {
    return <>Error: {error?.data.message}</>;
  }

  return (
    <div className="md:flex md:justify-between gap-12 border-4 border-gray-600 rounded-md h-fit md:w-[80%] mx-auto my-4 p-4">
      <div className=" md:w-[50%] flex justify-between items-center">
        <FontAwesomeIcon
          onClick={decreaseIndex}
          icon={faCaretLeft}
          className="cursor-pointer h-12 text-blue-100 hover:text-blue-500"
        />
        <img
          className="h-72 object-contain hover:scale-105"
          src={product?.images[index]}
          alt="product?.name"
        />
        <FontAwesomeIcon
          onClick={increaseIndex}
          icon={faCaretRight}
          className="cursor-pointer h-12 text-blue-100 hover:text-blue-500"
        />
      </div>
      <div className="md:w-[50%]">
        <p className="text-2xl font-bold text-blue-700 capitalize">
          {product?.name}
        </p>
        <div className="flex justify-between my-2">
          <div>
            <span className="text-blue-700 ">Category: </span>{" "}
            <span className="capitalize text-xl">{product?.category} </span>
          </div>
          <div>
            <span className="text-blue-700">Price: </span>
            <span className="text-xl">${product?.price}</span>
          </div>
        </div>
        <div className="flex justify-between my-6">
          <div className="flex justify-between">
            <Button className="text-xl" onClick={decreaseQuantity}>
              -
            </Button>
            <div className="mx-4 mt-2"> Quantity: {quantity}</div>
            <Button className="text-xl" onClick={increaseQuantity}>
              +
            </Button>
          </div>
          <div className="min-w-16">
            <AddOrRemoveFromCart product={product} />
          </div>
        </div>
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
