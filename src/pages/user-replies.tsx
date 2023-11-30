import {useParams} from "react-router-dom";
import {useTitle} from "../hooks";

function UserReplies() {
  const {username} = useParams();
  useTitle(`Tweets with reply by ${username}`);

  return (
    <p>Replies</p>
  );
}

export default UserReplies;