import { createContext } from "react";

export type User = {
  id: number;
  email: string;
  name: string;
  bio: null | string;
  avatar: null | string;
  createdAt: Date;
  updatedAt: Date;
};

type State = {
  token?: string;
  user?: User;
  changeToken: (newToken?: string) => void;
  addUser: (user: User) => void;
  removeUser: () => void;
  saveAuthInfo: (token: string, user: User) => void;
};

export const AuthContext = createContext<State>({
  changeToken: () => {},
  addUser: () => {},
  removeUser: () => {},
  saveAuthInfo: () => {},
  token: undefined,
});
