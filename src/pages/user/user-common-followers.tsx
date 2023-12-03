import {useParams} from "react-router-dom";
import {useProfile, useTitle} from "../../hooks";
import UserFollowTabs from "../../components/users/user-follow-tabs";
import {useQuery} from "@apollo/client";
import {COMMON_FOLLOWERS_QUERY} from "../../graphql/queries";
import {FollowersYouMayKnowData} from "../../types";
import UserCard from "../../components/users/user-card";
import {Spin} from "antd";
import ErrorResult from "../../components/error-result";

function UserCommonFollowers() {
  const {username} = useParams();
  useTitle(`People you know following ${username}`);
  const {profile} = useProfile();
  const {data, loading, error} = useQuery<FollowersYouMayKnowData>(COMMON_FOLLOWERS_QUERY, {
    variables: {
      userId: profile?.id
    },
    fetchPolicy: "no-cache"
  });
  if (error) return (<ErrorResult error={error}/>);
  const users = data?.UserQueries.followersYouMayKnow
    .map(u => <UserCard user={u} key={u.id}/>);

  return (
    <>
      <UserFollowTabs username={username!}/>
      {loading ? <Spin spinning={loading} className="min-h-[50vh]">
        <div/>
      </Spin> : users}
    </>
  );
}

export default UserCommonFollowers;