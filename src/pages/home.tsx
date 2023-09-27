import {Button} from "antd";
import {useAuth} from "../hooks";

function Home() {
  const {onLogout, user} = useAuth();

  return (
    <Button onClick={onLogout}>
      Logout {user?.sub} {user?.id}
    </Button>
  );
}

export default Home;