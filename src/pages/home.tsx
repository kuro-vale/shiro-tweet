import {Button} from "antd";
import {useAuth} from "../hooks";

function Home() {
  const {onLogout} = useAuth();

  return (
    <Button onClick={onLogout}>
      Logout
    </Button>
  );
}

export default Home;