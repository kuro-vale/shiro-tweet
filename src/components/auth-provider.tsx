import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts";
import {AuthContextProps, AuthProviderProps, UserRequest} from "../types";
import {useState} from "react";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState(!!localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (request: UserRequest) => {
    setLoading(true);
    document.getElementById("root")?.blur();
    // Simulate loading
    setTimeout(() => {
      console.log(request);
      localStorage.setItem("user", "true");
      setUser(true);
      setLoading(false);
      navigate(location.state?.path || "/home");
    }, 5000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(false);
    navigate("/");
  };

  const handleRegister = (request: UserRequest) => {
    setLoading(true);
    document.getElementById("sex")?.focus();
    // Simulate loading
    setTimeout(() => {
      console.log(request);
      localStorage.setItem("user", "true");
      setUser(true);
      setLoading(false);
      navigate("/home");
    }, 5000);
  };

  const value: AuthContextProps = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  };


  Spin.setDefaultIndicator(<LoadingOutlined style={{fontSize: 40}} spin/>);

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
      <Spin
        wrapperClassName="bg-black"
        spinning={loading}
      >
        <span onKeyDown={e => loading && e.preventDefault()}>
          {props.children}
        </span>
      </Spin>
    </AuthContext.Provider>
  );
};

export default AuthProvider;