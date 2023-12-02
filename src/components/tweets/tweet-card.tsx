import {Tweet} from "../../types";
import {Avatar, Typography} from "antd";
import {getDateMinimal} from "../../utils";
import ParentTweet from "./parent-tweet";
import TweetButtons from "./tweet-buttons";
import UserPopover from "../users/user-popover";
import {Link} from "react-router-dom";
import {TWEET_DETAILS} from "../../constants";
import {useTweetVars} from "../../hooks";
import TweetOptionsPopover from "./tweet-options-popover";

const {Text} = Typography;

type TweetCardProps = {
  tweet: Tweet,
  hideReplyMessage?: boolean,
}

function TweetCard({tweet, hideReplyMessage}: TweetCardProps) {
  const {user, isFollowedByYou, setIsFollowedByYou, handleClick, handleDelete} = useTweetVars(tweet);

  return (
    <li className="px-4 pt-3 border-b-[1px] border-b-border">
      {!!tweet.parent && <ParentTweet tweet={tweet.parent} replying={false}/>}
      <article
        className="flex cursor-pointer"
        onClick={handleClick}
      >
        <UserPopover user={tweet.author} isFollowedByYou={isFollowedByYou} setIsFollowedByYou={setIsFollowedByYou}>
          <Avatar
            src={`https://picsum.photos/seed/${tweet.author.username}/400/`}
            size="large"
            alt={tweet.author.username + " photo"}
            className="bg-gray"
          />
        </UserPopover>
        <div className="ml-3 flex-1">
          <div className="flex flex-row justify-between">
            <span>
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
              <Text className="text-secondary"> · </Text>
              <Link
                to={TWEET_DETAILS
                  .replace(":tweetId", `${tweet.id}`)
                  .replace(":username", tweet.author.username)}
                className="text-secondary hover:underline hover:text-secondary"
              >
                {getDateMinimal(tweet.createdAt)}
              </Link>
            </span>
            {user?.id === tweet.author.id && <TweetOptionsPopover tweet={tweet} onDelete={handleDelete}/>}
          </div>
          <p className="flex flex-col">
            {tweet.parentId && !tweet.parent && !hideReplyMessage &&
              <Text className="text-secondary">Replying to a tweet</Text>}
            <Text className="whitespace-pre-line">{tweet.body}</Text>
          </p>
          <TweetButtons tweet={tweet}/>
        </div>
      </article>
    </li>
  );
}

export default TweetCard;