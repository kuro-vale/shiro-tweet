import {useParams} from "react-router-dom";
import {useProfile, useTitle} from "../../hooks";
import {COMMON_FOLLOWERS_QUERY} from "../../graphql/queries";
import UserList from "../../components/users/user-list";

function UserCommonFollowers() {
  const {username} = useParams();
  useTitle(`People you know following ${username}`);
  const {profile} = useProfile();

  return (
    <>
      {!!profile && <UserList query={COMMON_FOLLOWERS_QUERY} user={profile}/>}
    </>
  );
}

export default UserCommonFollowers;