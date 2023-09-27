import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts";
import {AuthContextProps, AuthProviderProps, UserRequest} from "../types";
import {useState} from "react";

const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState(!!localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (request: UserRequest) => {
    // Simulate loading
    setTimeout(() => {
      localStorage.setItem("user", "true");
      setUser(true);
      navigate(location.state?.path || "/home");
    }, 5000);
  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    setUser(false);
    navigate("/");
  };

  const handleRegister = async (request: UserRequest) => {
    // Simulate loading
    setTimeout(() => {
      localStorage.setItem("user", "true");
      setUser(true);
      navigate("/home");
    }, 5000);

  };

  const value: AuthContextProps = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  };

  if (!user && location.pathname !== "/") {
    return (
      <Navigate to="/?login=true" replace state={{path: location.pathname}}/>
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