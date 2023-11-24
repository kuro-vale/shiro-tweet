import {Tweet} from "../../types";
import {Avatar, Typography} from "antd";
import {getDateMinimal} from "../../utils";
import ParentTweet from "./parent-tweet";
import TweetButtons from "./tweet-buttons";
import UserPopover from "../users/user-popover";
import {useState} from "react";

const {Text} = Typography;

type TweetCardProps = {
  tweet: Tweet
}

function TweetCard({tweet}: TweetCardProps) {
  const [isFollowedByYou, setIsFollowedByYou] = useState(tweet.author.isFollowedByYou);
  // TODO: cursor pointer and link
  return (
    <li className="px-4 pt-3 border-b-[1px] border-b-border">
      {tweet.parent && <ParentTweet tweet={tweet.parent} replying={false}/>}
      <article className="flex">
        <UserPopover user={tweet.author} isFollowedByYou={isFollowedByYou} setIsFollowedByYou={setIsFollowedByYou}>
          <Avatar
            src={`https://picsum.photos/seed/${tweet.author.username}/400/`}
            size="large"
            alt={tweet.author.username + " photo"}
          />
        </UserPopover>
        <div className="ml-3 flex-1">
          <UserPopover user={tweet.author} isFollowedByYou={isFollowedByYou} setIsFollowedByYou={setIsFollowedByYou}>
            <Text strong className="hover:underline">{tweet.author.username}</Text>
          </UserPopover>
          <UserPopover user={tweet.author} isFollowedByYou={isFollowedByYou} setIsFollowedByYou={setIsFollowedByYou}>
            <Text className="text-secondary"> @{tweet.author.username}</Text>
          </UserPopover>
          <Text className="text-secondary"> · </Text>
          <Text className="text-secondary hover:underline">{getDateMinimal(tweet.createdAt)}</Text>
          <p><Text className="whitespace-pre-line">{tweet.body}</Text></p>
          <TweetButtons tweet={tweet}/>
        </div>
      </article>
    </li>
  );
}

export default TweetCard;