import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../UserData/Context";

const PrivateRoute = ({ children }) => {
  const { USER_Context_State, dispatch } = useUserContext();

  if (!USER_Context_State.user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default PrivateRoute;
