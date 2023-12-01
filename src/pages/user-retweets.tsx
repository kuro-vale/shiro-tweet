import {useParams} from "react-router-dom";
import {useProfile, useTitle} from "../hooks";
import TweetList from "../components/tweets/tweet-list";
import {USER_RETWEETS} from "../graphql/queries";

function UserRetweets() {
  const {username} = useParams();
  useTitle(`Retweets of ${username}`);
  const {profile} = useProfile();

  return (
    <>
      {!!profile &&
        <TweetList query={USER_RETWEETS} userId={profile.id} emptyMessage={`${profile.username} has no retweets.`}/>
      }
    </>
  );
}

export default UserRetweets;