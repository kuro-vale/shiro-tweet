import {useParams} from "react-router-dom";
import {useAuth, useProfile, useTitle} from "../../hooks";
import TweetList from "../../components/tweets/tweet-list";
import {USER_HEARTS} from "../../graphql/queries";

function UserLikes() {
  const {username} = useParams();
  useTitle(`Tweets liked by ${username}`);
  const {profile} = useProfile();
  const {user} = useAuth();
  const message = user?.id === profile?.id ? "You have no likes" : `${profile?.username} has no likes.`;

  return (
    <>
      {!!profile &&
        <TweetList query={USER_HEARTS} userId={profile.id} emptyMessage={message}/>
      }
    </>
  );
}

export default UserLikes;