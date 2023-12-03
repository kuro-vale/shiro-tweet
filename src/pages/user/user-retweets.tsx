import {useParams} from "react-router-dom";
import {useAuth, useProfile, useTitle} from "../../hooks";
import TweetList from "../../components/tweets/tweet-list";
import {USER_RETWEETS} from "../../graphql/queries";

function UserRetweets() {
  const {username} = useParams();
  useTitle(`Retweets of ${username}`);
  const {profile} = useProfile();
  const {user} = useAuth();
  const message = user?.id === profile?.id ? "You have no retweets" : `${profile?.username} has no retweets.`;

  return (
    <>
      {!!profile &&
        <TweetList query={USER_RETWEETS} userId={profile.id} emptyMessage={message}/>
      }
    </>
  );
}

export default UserRetweets;