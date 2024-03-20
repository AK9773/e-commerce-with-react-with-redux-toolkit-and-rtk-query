import React from "react";
import Button from "./Button";
import { useLogoutMutation } from "../features/userApi";

const Logout = () => {
  const [logout] = useLogoutMutation();
  const logoutHandle = () => {
    logout();
  };
  return (
    <div>
      <Button onClick={logoutHandle}>Logout</Button>
    </div>
  );
};

export default Logout;
