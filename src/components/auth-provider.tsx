import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts";
import {AuthContextProps, AuthProviderProps, User, UserRequest} from "../types";
import {useState} from "react";
import {HOME_ROUTE, LANDING_ROUTE, LOGIN_ROUTE, TOKEN_KEY} from "../const";
import jwtDecode from "jwt-decode";

const AuthProvider = (props: AuthProviderProps) => {
  const token = localStorage.getItem(TOKEN_KEY);
  let decoded: User | null = null;
  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (e) {
      localStorage.clear();
    }
  }

  const [user, setUser] = useState<User | null>(decoded);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async (request: UserRequest) => {
    localStorage.setItem(TOKEN_KEY, "token");
    setUser(jwtDecode("token"));
    navigate(location.state?.path || HOME_ROUTE);
  };

  const handleLogout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    navigate(LANDING_ROUTE);
  };

  const handleRegister = async (request: UserRequest) => {
    localStorage.setItem("user", "true");
    // setUser(true);
    navigate(HOME_ROUTE);
  };

  const value: AuthContextProps = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  };

  if (!user && location.pathname !== LANDING_ROUTE) {
    return (
      <Navigate to={LOGIN_ROUTE} replace state={{path: location.pathname}}/>
    );
  } else if (user && location.pathname === LANDING_ROUTE) {
    return (
      <Navigate to={HOME_ROUTE} replace/>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;