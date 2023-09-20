import {AuthContext} from "./contexts";
import {useContext} from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};