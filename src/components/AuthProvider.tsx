import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts";
import {AuthContextProps, AuthProviderProps, UserRequest} from "../types";
import {useState} from "react";

const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState(!!localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (request: UserRequest) => {
    console.log(request);
    localStorage.setItem("user", "true");
    setUser(true);
    navigate("/home", {replace: false});
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(false);
    navigate("/");
  };

  const value: AuthContextProps = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  if (!user && location.pathname !== "/") {
    return (
      <Navigate to="/?login=true" replace/>
    );
  } else if (user && location.pathname === "/") {
    return (
      <Navigate to="/home" replace/>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;