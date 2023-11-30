import {useProfile, useTitle} from "../hooks";
import {useParams} from "react-router-dom";
import TweetList from "../components/tweets/tweet-list";
import {USER_INDEX_QUERY} from "../graphql/queries";

function UserIndex() {
  const {username} = useParams();
  useTitle(username!);
  const {profile} = useProfile();
  return (
    <>
      {!!profile &&
        <TweetList query={USER_INDEX_QUERY} userId={profile?.id}/>
      }
    </>

  );
}

export default UserIndex;