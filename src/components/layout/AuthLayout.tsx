import { AuthContext } from "@/context/authContext";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);

  return (
    <>
      {/* navigation */}
      <Outlet />
    </>
  );
};

export default AuthLayout;
