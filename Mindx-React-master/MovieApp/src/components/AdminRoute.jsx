import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import MovieContext from "../MovieContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(MovieContext);

  if (user?.role !== "admin") {
    return <Navigate to="/" />; // Điều hướng về trang chính nếu không phải admin
  }

  return children;
};

export default AdminRoute;
