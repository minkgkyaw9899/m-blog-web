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
};

export const AuthContext = createContext<State>({ changeToken: () => {} });
