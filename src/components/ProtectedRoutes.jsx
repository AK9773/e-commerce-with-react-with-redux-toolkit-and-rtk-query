import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ Component }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return <>{user && <Component />}</>;
};

export default ProtectedRoutes;
