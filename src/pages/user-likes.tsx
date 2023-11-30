import {useParams} from "react-router-dom";
import {useTitle} from "../hooks";

function UserLikes() {
  const {username} = useParams();
  useTitle(`Tweets liked by ${username}`);

  return (
    <p>likes</p>
  );
}

export default UserLikes;