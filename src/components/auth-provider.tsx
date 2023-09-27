import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts";
import {AuthContextProps, AuthData, AuthProviderProps, AuthRequest, User} from "../types";
import {useState} from "react";
import {HOME_ROUTE, LANDING_ROUTE, LOGIN_ROUTE, TOKEN_KEY} from "../constants";
import jwtDecode from "jwt-decode";
import {useMutation} from "@apollo/client";
import {LOGIN_MUTATION} from "../graphql/mutations";

const AuthProvider = (props: AuthProviderProps) => {
  const localToken = localStorage.getItem(TOKEN_KEY);
  let decoded: User | null = null;
  if (localToken) {
    try {
      decoded = jwtDecode(localToken);
    } catch (e) {
      localStorage.clear();
    }
  }

  const [user, setUser] = useState<User | null>(decoded);
  const [mutateLogin] = useMutation<AuthData>(LOGIN_MUTATION);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (request: AuthRequest) => {
    try {
      let {data} = await mutateLogin({variables: request});
      const token = data!.Auth.login.token;
      localStorage.setItem(TOKEN_KEY, token);
      setUser(jwtDecode(token));
      navigate(location.state?.path || HOME_ROUTE);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    navigate(LANDING_ROUTE);
  };

  const handleRegister = async (request: AuthRequest) => {
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