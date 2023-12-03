import {Tweet} from "../../types";
import {Avatar, Typography} from "antd";
import {getDateMinimal} from "../../utils";
import TweetButtons from "./tweet-buttons";
import UserPopover from "../users/user-popover";
import {useTweetVars} from "../../hooks";
import {Link} from "react-router-dom";
import {TWEET_DETAILS} from "../../constants";
import TweetOptionsPopover from "./tweet-options-popover";

const {Text} = Typography;
type ParentTweetProps = {
  tweet: Tweet,
  replying: boolean
}

function ParentTweet({tweet, replying}: ParentTweetProps) {
  const {user, isFollowedByYou, setIsFollowedByYou, handleClick, handleDelete} = useTweetVars(tweet);

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
        <div className="flex flex-row justify-between mb-1">
          <span>
          {replying ?
            <>
              <Text strong>{tweet.author.username}</Text>
              <Text className="text-secondary"> @{tweet.author.username}</Text>
            </>
            :
            <>
              <UserPopover
                user={tweet.author}
                isFollowedByYou={isFollowedByYou}
                setIsFollowedByYou={setIsFollowedByYou}
              >
                <Text strong className="hover:underline">{tweet.author.username}</Text>
              </UserPopover>
              <UserPopover
                user={tweet.author}
                isFollowedByYou={isFollowedByYou}
                setIsFollowedByYou={setIsFollowedByYou}
              >
                <Text className="text-secondary"> @{tweet.author.username}</Text>
              </UserPopover>
            </>
          }
            <Text className="text-secondary"> · </Text>
            {replying ?
              <Text
                className={`text-secondary ${replying ? "" : "hover:underline"}`}>{getDateMinimal(tweet.createdAt)}</Text>
              : <Link
                onClick={e => e.stopPropagation()}
                to={TWEET_DETAILS
                  .replace(":tweetId", `${tweet.id}`)
                  .replace(":username", tweet.author.username)}
                className={`text-secondary ${replying ? "" : "hover:underline hover:text-secondary"}`}
              >
                {getDateMinimal(tweet.createdAt)}
              </Link>}
            </span>
          {user?.id === tweet.author.id && <TweetOptionsPopover tweet={tweet} onDelete={handleDelete}/>}
        </div>
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