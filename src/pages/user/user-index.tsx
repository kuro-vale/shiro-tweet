import {useAuth, useProfile, useTitle} from "../../hooks";
import {useParams} from "react-router-dom";
import TweetList from "../../components/tweets/tweet-list";
import {USER_INDEX_QUERY} from "../../graphql/queries";

function UserIndex() {
  const {username} = useParams();
  useTitle(username!);
  const {profile} = useProfile();
  const {user} = useAuth();
  const message = user?.id === profile?.id ? "You have no tweets" : `${profile?.username} has no tweets.`;

  return (
    <>
      {!!profile &&
        <TweetList query={USER_INDEX_QUERY} userId={profile.id} emptyMessage={message}/>
      }
    </>

  );
}

export default UserIndex;