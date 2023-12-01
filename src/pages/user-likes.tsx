import {useParams} from "react-router-dom";
import {useProfile, useTitle} from "../hooks";
import TweetList from "../components/tweets/tweet-list";
import {USER_HEARTS} from "../graphql/queries";

function UserLikes() {
  const {username} = useParams();
  useTitle(`Tweets liked by ${username}`);
  const {profile} = useProfile();

  return (
    <>
      {!!profile &&
        <TweetList query={USER_HEARTS} userId={profile.id}/>
      }
    </>
  );
}

export default UserLikes;