import {useTitle} from "../hooks";
import {useParams} from "react-router-dom";

function UserIndex() {
  const {username} = useParams();
  useTitle(username!);
  return (
    <p>tweets</p>
  );
}

export default UserIndex;