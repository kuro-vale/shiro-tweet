import {AuthContextProps} from "./types";
import {createContext} from "react";

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  onLogin: () => {
    throw new Error("Not implemented");
  },
  onLogout: () => {
    throw new Error("Not implemented");
  },
  onRegister: () => {
    throw new Error("Not Implemented");
  },
});