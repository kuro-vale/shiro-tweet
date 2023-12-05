import {User} from "../../types";
import {Link} from "react-router-dom";
import {Typography} from "antd";
import {shortNumber} from "../../utils";
import {USER_FOLLOWERS_ROUTE, USER_FOLLOWING_ROUTE} from "../../constants";

const {Text} = Typography;

function UserFollowStats({user}: { user: User }) {
  return (
    <div className="mt-3">
      <Link
        to={USER_FOLLOWING_ROUTE.replace(":username", user.username)}
        className="hover:text-white hover:underline"
      >
        <Text strong className="text-sm">{shortNumber(user.following!)}</Text>
        <Text className="text-secondary text-sm"> Following</Text>
      </Link>
      <Link
        to={USER_FOLLOWERS_ROUTE.replace(":username", user.username)}
        className="ml-5 hover:text-white hover:underline"
      >
        <Text strong className="text-sm">{shortNumber(user.followers!)}</Text>
        <Text className="text-secondary text-sm"> Followers</Text>
      </Link>
    </div>
  );
}

export default UserFollowStats;