import { AuthContext } from "@/context/authContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
  const { token } = useContext(AuthContext);
  const navigation = useNavigate();

  useEffect(() => {
    if (!token) {
      navigation("/auth/sign-in");
    }
  }, [navigation, token]);

  return (
    <div>
      {/* form  */}
      <div></div>
      {/* image */}
    </div>
  );
};

export default HomePage;
