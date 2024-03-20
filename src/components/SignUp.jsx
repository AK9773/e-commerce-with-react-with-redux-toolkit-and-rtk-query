import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { useSignupMutation } from "../features/userApi";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [signup] = useSignupMutation();
  const signUp = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("fullName", data.fullName);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar[0]);

    const response = await signup(formData);
    console.log(response);
  };
  return (
    <form onSubmit={handleSubmit(signUp)} className="mx-auto w-6/12 mt-8">
      <Input
        label="Username: "
        type="text"
        placeholder="Enter username.."
        {...register("username")}
        required
      />
      <Input
        label="Email: "
        type="email"
        placeholder="Enter email.."
        {...register("email")}
        required
      />
      <Input
        label="Full Name: "
        type="text"
        placeholder="Enter Full Name.."
        {...register("fullName")}
        required
      />
      <Input
        label="Password: "
        type="password"
        placeholder="Enter password.."
        {...register("password")}
        required
      />
      <Input
        label="Profile Image: "
        type="file"
        accept="image/*"
        {...register("avatar")}
      />
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUp;
