import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <>
      {/* navigation */}
      <Outlet />
    </>
  );
};

export default AuthLayout;
