import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Layout from "@src/layout/Layout";


const ProtectedRoutes = () => {
  const { role  } = useContext(AuthContext);

  const token = localStorage.getItem('token')
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout role={role}>
      <Outlet />
    </Layout>
  )
};

export default ProtectedRoutes;
