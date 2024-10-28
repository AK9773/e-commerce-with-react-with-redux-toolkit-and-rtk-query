import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useSignupMutation } from "../features/api/userApi";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [signup, { data: signUpData, isError, error }] = useSignupMutation();
  const signUp = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("fullName", data.fullName);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar[0]);

    await signup(formData);
  };
  useEffect(() => {
    if (signUpData && signUpData.message) {
      alert(signUpData.message);
      navigate("/login");
    }
  }, [signUpData]);
  return (
    <>
      <form onSubmit={handleSubmit(signUp)} className="mx-auto w-6/12 pt-8">
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

      <div className=" text-center mt-4 text-xl font-bold">
        Already have an account? Click here to login.
        <Link to="/login" className="text-[#564ef0] ml-4">
          Login
        </Link>
      </div>
    </>
  );
};

export default SignUp;
