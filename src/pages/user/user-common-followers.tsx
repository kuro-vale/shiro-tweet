import {useParams} from "react-router-dom";
import {useProfile, useTitle} from "../../hooks";
import UserFollowTabs from "../../components/users/user-follow-tabs";
import {COMMON_FOLLOWERS_QUERY} from "../../graphql/queries";
import UserList from "../../components/users/user-list";

function UserCommonFollowers() {
  const {username} = useParams();
  useTitle(`People you know following ${username}`);
  const {profile} = useProfile();

  return (
    <>
      <UserFollowTabs username={username!}/>
      {!!profile && <UserList query={COMMON_FOLLOWERS_QUERY} user={profile}/>}
    </>
  );
}

export default UserCommonFollowers;