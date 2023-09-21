import {AuthContextProps} from "./types";
import {createContext} from "react";

export const AuthContext = createContext<AuthContextProps>({
  user: !!localStorage.getItem("user"),
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