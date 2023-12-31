import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts";
import {AuthContextProps, AuthData, AuthRequest, ParentProps, UserJWT} from "../types";
import {useState} from "react";
import {HOME_ROUTE, LANDING_ROUTE, LOGIN_ROUTE, TOKEN_KEY, USER_ROUTE} from "../constants";
import jwtDecode from "jwt-decode";
import {useApolloClient, useMutation} from "@apollo/client";
import {LOGIN_MUTATION, REGISTER_MUTATION} from "../graphql/mutations";
import {message} from "antd";
import {handleError, showMessage} from "../utils";


const AuthProvider = (props: ParentProps) => {
  const localToken = localStorage.getItem(TOKEN_KEY);
  let decoded: UserJWT | null = null;
  if (localToken) {
    try {
      decoded = jwtDecode(localToken);
    } catch (e) {
      localStorage.clear();
    }
  }

  const [user, setUser] = useState<UserJWT | null>(decoded);
  const [mutateLogin] = useMutation<AuthData>(LOGIN_MUTATION);
  const [mutateRegister] = useMutation<AuthData>(REGISTER_MUTATION);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const apolloClient = useApolloClient();

  const handleLogin = async (request: AuthRequest) => {
    try {
      const {data} = await mutateLogin({variables: request});
      const token = data!.Auth.login.token;
      localStorage.setItem(TOKEN_KEY, token);
      setUser(jwtDecode(token));
      navigate(location.state?.path || HOME_ROUTE);
    } catch (e) {
      await handleError(messageApi, e);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    navigate(LANDING_ROUTE);
    await apolloClient.clearStore();
    await showMessage(messageApi, "Successfully logout.");
  };

  const handleRegister = async (request: AuthRequest) => {
    try {
      const {data} = await mutateRegister({variables: request});
      const token = data!.Auth.register.token;
      localStorage.setItem(TOKEN_KEY, token);
      const decodedUser: UserJWT = jwtDecode(token);
      setUser(decodedUser);
      navigate(USER_ROUTE.replace(":username", decodedUser.sub));
    } catch (e) {
      await handleError(messageApi, e);
    }
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
      {contextHolder}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;