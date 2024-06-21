import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { useLoginMutation, useLogoutMutation } from "../features/api/userApi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { login, setError } from "../features/slice/userSlice";
import {
  cartApi,
  useGetCartItemsQuery,
  useInsertManyToCartMutation,
} from "../features/api/cartApi";
import { updateCartFromServer } from "../features/slice/cartSlice";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [loginMutation, { isError, isLoading, data, error }] =
    useLoginMutation();

  const [insertMutation] = useInsertManyToCartMutation();

  const loginHandle = async (loginData) => {
    await loginMutation(loginData);
  };

  useEffect(() => {
    const loginFunction = async () => {
      if (data && data.user) {
        dispatch(login(data.user));
        if (localStorage.getItem("cartItems")) {
          const cartItems = JSON.parse(localStorage.getItem("cartItems"));
          await insertMutation(cartItems);
        }
        localStorage.removeItem("cartItems");
        localStorage.setItem("userId", data.user._id);
        dispatch(cartApi.util.invalidateTags(["Carts"]));

        navigate("/");
      }

      if (isError) {
        dispatch(setError(error.data));
      }
    };
    loginFunction();
  }, [data, isError]);

  return (
    <div>
      {isError && (
        <>
          <div className="text-red-900 text-center">
            Error: {error.data.message}
          </div>
        </>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit(loginHandle)}
          className="mx-auto w-6/12 pt-8"
        >
          <Input
            type="text"
            label="Username: "
            placeholder="Enter your username.."
            {...register("username", {
              required: true,
            })}
          />
          <Input
            type="password"
            label="Password: "
            placeholder="Enter your password.."
            {...register("password", {
              required: true,
            })}
          />
          <Button className="mt-4" type="submit">
            Login
          </Button>
        </form>
      )}

      <div className=" text-center mt-4 text-xl font-bold">
        Don't have an account? Click here to craete account.
        <Link to="/signup" className="text-[#564ef0] ml-4">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
