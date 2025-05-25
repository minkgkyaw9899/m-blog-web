import ProfileAndSearch from "../home-navbar/ProfileAndSearch";
import Navigation from "../home-navbar/Navigation";
import Logo from "../home-navbar/Logo";
import { Outlet, useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";

const HomeLayout = () => {
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/auth/sign-in");
  }, [navigate, token]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <nav className="border-gray-200 sticky top-0 border-b shadow-md backdrop-blur">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Logo />
          <ProfileAndSearch />
          <Navigation />
        </div>
      </nav>
      <main className="py-4 px-24">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
