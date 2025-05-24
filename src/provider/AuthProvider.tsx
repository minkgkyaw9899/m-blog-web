import { AuthContext, type User } from "@/context/authContext";
import { useState, type PropsWithChildren } from "react";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | undefined>(
    localStorage.getItem("token") || undefined
  );

  const storedUser = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      return JSON.parse(savedUser) as User;
    }
  };
  const [user, setUser] = useState<User | undefined>(storedUser() || undefined);

  const changeToken = (newToken?: string) => {
    setToken(newToken);
  };

  const addUser = (user: User) => {
    setUser(user);
  };

  const removeUser = () => {
    setToken(undefined);
    setUser(undefined);
  };

  const saveAuthInfo = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <AuthContext
      value={{ token, changeToken, user, addUser, removeUser, saveAuthInfo }}
    >
      {children}
    </AuthContext>
  );
};
