import {useNavigate} from "react-router-dom";
import {UserRequest} from "../contexts/UserContext";

function LoginHook() {
  const navigate = useNavigate();
  const handleLogin = (request: UserRequest) => {
    console.log(request);
    navigate("/home", {replace: false});
  };

  return {handleLogin};
}

export default LoginHook;