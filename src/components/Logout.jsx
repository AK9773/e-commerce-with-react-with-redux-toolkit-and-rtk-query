import React from "react";
import Button from "./Button";
import { useLogoutMutation } from "../features/api/userApi";
import { useDispatch } from "react-redux";

const Logout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const logoutHandle = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Button onClick={logoutHandle}>Logout</Button>
    </div>
  );
};

export default Logout;
