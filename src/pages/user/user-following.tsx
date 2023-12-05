import {useParams} from "react-router-dom";
import {useProfile, useTitle} from "../../hooks";
import UserList from "../../components/users/user-list";
import {USER_FOLLOWING_QUERY} from "../../graphql/queries";

function UserFollowing() {
  const {username} = useParams();
  useTitle(`People followed by ${username}`);
  const {profile} = useProfile();

  return (
    <>
      {!!profile && <UserList query={USER_FOLLOWING_QUERY} user={profile}/>}
    </>
  );
}

export default UserFollowing;