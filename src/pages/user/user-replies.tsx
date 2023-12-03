import {useParams} from "react-router-dom";
import {useAuth, useProfile, useTitle} from "../../hooks";
import TweetList from "../../components/tweets/tweet-list";
import {USER_TWEETS} from "../../graphql/queries";

function UserReplies() {
  const {username} = useParams();
  useTitle(`Tweets with reply by ${username}`);
  const {profile} = useProfile();
  const {user} = useAuth();
  const message = user?.id === profile?.id ? "You have no tweets" : `${profile?.username} has no tweets.`;

  return (
    <>
      {!!profile &&
        <TweetList query={USER_TWEETS} userId={profile.id} emptyMessage={message}/>
      }
    </>
  );
}

export default UserReplies;