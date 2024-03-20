import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { useLoginMutation } from "../features/userApi";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const [login] = useLoginMutation();

  const loginHandle = async (data) => {
    const response = await login(data);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit(loginHandle)} className="mx-auto w-6/12 mt-8">
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
      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;
