import React from "react";
import Button from "./Button";
import { useLogoutMutation } from "../features/userApi";
import { Link } from "react-router-dom";

const Header = () => {
  const [logout] = useLogoutMutation();
  const logoutHandle = () => {
    logout();
  };
  return (
    <>
      <div className="flex items-center p-4 bg-pink-300">
        <div className="mr-8">
          <Link to="/">Home</Link>
        </div>
        <div className="mr-8">
          <Link to="/login">Login</Link>
        </div>
        <div className="mr-8">
          <button onClick={logoutHandle}>logout</button>
        </div>
        <div className="mr-8">
          <Link to="/addProduct">Add Product</Link>
        </div>
        <div className="mr-8">
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
