import {useParams} from "react-router-dom";
import {useTitle} from "../hooks";

function UserRetweets() {
  const {username} = useParams();
  useTitle(`Retweets of ${username}`);

  return (
    <p>Retweets</p>
  );
}

export default UserRetweets;