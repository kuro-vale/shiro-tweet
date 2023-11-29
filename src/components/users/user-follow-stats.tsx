import {User} from "../../types";
import {Link} from "react-router-dom";
import {Typography} from "antd";

const {Text} = Typography;

function UserFollowStats({user}: { user: User }) {
  // TODO: correct links
  return (
    <div className="mt-3">
      <Link to={"/following"} className="hover:text-white hover:underline">
        <Text>{user.following}</Text>
        <Text className="text-secondary"> Following</Text>
      </Link>
      <Link to={"/followers"} className="ml-5 hover:text-white hover:underline">
        <Text>{user.followers}</Text>
        <Text className="text-secondary"> Followers</Text>
      </Link>
    </div>
  );
}

export default UserFollowStats;