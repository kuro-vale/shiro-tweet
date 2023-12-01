import {useParams} from "react-router-dom";
import {useProfile, useTitle} from "../hooks";
import TweetList from "../components/tweets/tweet-list";
import {USER_TWEETS} from "../graphql/queries";

function UserReplies() {
  const {username} = useParams();
  useTitle(`Tweets with reply by ${username}`);
  const {profile} = useProfile();

  return (
    <>
      {!!profile &&
        <TweetList query={USER_TWEETS} userId={profile.id} emptyMessage={`${profile.username} has no tweets.`}/>
      }
    </>
  );
}

export default UserReplies;