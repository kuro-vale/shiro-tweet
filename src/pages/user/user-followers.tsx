import {useParams} from "react-router-dom";
import {useProfile, useTitle} from "../../hooks";
import UserList from "../../components/users/user-list";
import {USER_FOLLOWERS_QUERY} from "../../graphql/queries";

function UserFollowers() {
  const {username} = useParams();
  useTitle(`People following ${username}`);
  const {profile} = useProfile();

  return (
    <>
      {!!profile && <UserList query={USER_FOLLOWERS_QUERY} user={profile}/>}
    </>
  );
}

export default UserFollowers;