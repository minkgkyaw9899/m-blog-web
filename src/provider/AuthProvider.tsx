import { AuthContext } from "@/context/authContext";
import { useState, type PropsWithChildren } from "react";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string>()

  const changeToken = (newToken?: string) => {
    setToken(newToken)
  }

  return <AuthContext value={{token, changeToken}}>{children}</AuthContext>;
};
