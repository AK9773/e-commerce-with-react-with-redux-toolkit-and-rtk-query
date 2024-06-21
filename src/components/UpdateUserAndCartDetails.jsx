import React, { useEffect } from "react";
import { useGetUserQuery } from "../features/api/userApi";
import { useGetCartItemsQuery } from "../features/api/cartApi";
import { useDispatch } from "react-redux";
import { login } from "../features/slice/userSlice";
import { updateCartFromServer } from "../features/slice/cartSlice";

const UpdateUserAndCartDetails = () => {
  const { data: userData } = useGetUserQuery();
  const { data: cartData } = useGetCartItemsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartData && cartData.carts) {
      dispatch(updateCartFromServer(cartData.carts));
    }
  }, [cartData]);

  useEffect(() => {
    if (userData && userData.user) {
      dispatch(login(userData.user));
    }
  }, [userData]);

  return <></>;
};

export default UpdateUserAndCartDetails;
