import {useQuery} from "@apollo/client";
import {COMMON_FOLLOWERS} from "../../graphql/queries";
import {FollowersYouMayKnowData} from "../../types";
import {Link} from "react-router-dom";
import {Avatar} from "antd";

function CommonFollowers({userId}: { userId: number }) {
  const {data} = useQuery<FollowersYouMayKnowData>(COMMON_FOLLOWERS, {variables: {userId}});

  const users = data?.UserQueries.followersYouMayKnow.map(user => user.username) || [];
  const joinedUsernames = users.length > 3 ? users.slice(0, 3).join(", ") + `, and many others you follow` :
    users.length === 2 ? users.join(" and ") : users.join(", ");

  return (
    // TODO: Fix url
    <>
      {users.length > 0 &&
        <Link
          to={"/followers_you_follow"}
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
        </Link>}
    </>
  );
}

export default CommonFollowers;