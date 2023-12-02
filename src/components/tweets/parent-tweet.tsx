import {Tweet} from "../../types";
import {Avatar, Typography} from "antd";
import {getDateMinimal} from "../../utils";
import TweetButtons from "./tweet-buttons";
import UserPopover from "../users/user-popover";
import {useState} from "react";
import {useAuth} from "../../hooks";
import {Link, useNavigate} from "react-router-dom";
import {TWEET_DETAILS} from "../../constants";

const {Text} = Typography;
type ParentTweetProps = {
  tweet: Tweet,
  replying: boolean
}

function ParentTweet({tweet, replying}: ParentTweetProps) {
  const {user} = useAuth();
  const [isFollowedByYou, setIsFollowedByYou] = useState(tweet.author.isFollowedByYou);
  const navigate = useNavigate();
  const handleClick = () => {
    let selection = window.getSelection();
    if (!selection?.toString().trim()) {
      navigate(TWEET_DETAILS
        .replace(":tweetId", `${tweet.id}`)
        .replace(":username", tweet.author.username));
    }
  };

  return (
    <article className={`flex mb-3 ${replying ? "" : "cursor-pointer"}`} onClick={handleClick}>
      <div>
        {replying ?
          <Avatar
            src={`https://picsum.photos/seed/${tweet.author.username}/400/`}
            size="large"
            alt={tweet.author.username + " photo"}
          />
          : <UserPopover user={tweet.author} isFollowedByYou={isFollowedByYou} setIsFollowedByYou={setIsFollowedByYou}>
            <Avatar
              src={`https://picsum.photos/seed/${tweet.author.username}/400/`}
              size="large"
              alt={tweet.author.username + " photo"}
              className="bg-gray"
            />
          </UserPopover>}
        <div className={`w-[2px] pt-1 h-full mx-auto ${replying ? "pb-10" : "pb-8"}`}>
          <div className="bg-gray h-full"/>
        </div>
      </div>
      <div className="ml-3 flex-1">
        {replying ?
          <>
            <Text strong>{tweet.author.username}</Text>
            <Text className="text-secondary"> @{tweet.author.username}</Text>
          </>
          :
          <>
            <UserPopover user={tweet.author} isFollowedByYou={isFollowedByYou} setIsFollowedByYou={setIsFollowedByYou}>
              <Text strong className="hover:underline">{tweet.author.username}</Text>
            </UserPopover>
            <UserPopover user={tweet.author} isFollowedByYou={isFollowedByYou} setIsFollowedByYou={setIsFollowedByYou}>
              <Text className="text-secondary"> @{tweet.author.username}</Text>
            </UserPopover></>
        }
        <Text className="text-secondary"> · </Text>
        {replying ?
          <Text
            className={`text-secondary ${replying ? "" : "hover:underline"}`}>{getDateMinimal(tweet.createdAt)}</Text>
          : <Link
            to={TWEET_DETAILS
              .replace(":tweetId", `${tweet.id}`)
              .replace(":username", tweet.author.username)}
            className={`text-secondary ${replying ? "" : "hover:underline hover:text-secondary"}`}
          >
            {getDateMinimal(tweet.createdAt)}
          </Link>}
        <p className="flex flex-col">
          {tweet.parentId && !tweet.parent &&
            <Text className="text-secondary">Replying to a tweet</Text>}
          <Text className="whitespace-pre-line">{tweet.body}</Text>
        </p>
        {replying ?
          user?.id !== tweet.author.id && <p className="py-4">
            <Text className="text-secondary">Replying to</Text>
            <Text className="text-primary"> @{tweet.author.username}</Text>
          </p> :
          <TweetButtons tweet={tweet}/>
        }
      </div>
    </article>
  );
}

export default ParentTweet;