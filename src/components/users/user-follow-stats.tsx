import {User} from "../../types";
import {Link} from "react-router-dom";
import {Typography} from "antd";
import {shortNumber} from "../../utils";

const {Text} = Typography;

function UserFollowStats({user}: { user: User }) {
  // TODO: correct links
  return (
    <div className="mt-3">
      <Link to={"/following"} className="hover:text-white hover:underline">
        <Text strong className="text-sm">{shortNumber(user.following!)}</Text>
        <Text className="text-secondary text-sm"> Following</Text>
      </Link>
      <Link to={"/followers"} className="ml-5 hover:text-white hover:underline">
        <Text strong className="text-sm">{shortNumber(user.followers!)}</Text>
        <Text className="text-secondary text-sm"> Followers</Text>
      </Link>
    </div>
  );
}

export default UserFollowStats;