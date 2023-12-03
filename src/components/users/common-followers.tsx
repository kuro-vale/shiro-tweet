import {useQuery} from "@apollo/client";
import {COMMON_FOLLOWERS} from "../../graphql/queries";
import {FollowersYouMayKnowData, User} from "../../types";
import {Link} from "react-router-dom";
import {Avatar, Typography} from "antd";
import {COMMON_FOLLOWERS_ROUTE} from "../../constants";

const {Text} = Typography;
type CommonFollowersProps = {
  user: User,
  showMessage?: boolean
}

function CommonFollowers({user, showMessage}: CommonFollowersProps) {
  const {data} = useQuery<FollowersYouMayKnowData>(COMMON_FOLLOWERS, {variables: {userId: user.id}});

  const users = data?.UserQueries.followersYouMayKnow.map(u => u.username) || [];
  const joinedUsernames = users.length > 3 ? users.slice(0, 3).join(", ") + `, and many others you follow` :
    users.length === 2 ? users.join(" and ") : users.join(", ");

  return (
    <>
      {users.length > 0 ?
        <Link
          to={COMMON_FOLLOWERS_ROUTE.replace(":username", user.username)}
          className="flex flex-row mt-3 text-secondary hover:underline hover:text-secondary"
        >
          <Avatar.Group>
            {users.slice(0, 3).map(username =>
              <Avatar
                src={`https://picsum.photos/seed/${username}/100/`}
                size={24}
                key={username}
                className="bg-gray"
              />)}
          </Avatar.Group>
          <p className="text-[13px] text-secondary ml-3 hover:underline hover:text-secondary">
            Followed by {joinedUsernames}</p>
        </Link>
        : showMessage &&
        <Text className="text-[13px] text-secondary mt-2">Not followed by anyone you’re following</Text>
      }
    </>
  );
}

export default CommonFollowers;