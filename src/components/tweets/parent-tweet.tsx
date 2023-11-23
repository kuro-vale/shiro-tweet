import {Tweet} from "../../types";
import {Avatar, Typography} from "antd";
import {getDateMinimal} from "../../utils";
import TweetButtons from "./tweet-buttons";
import UserPopover from "../users/user-popover";
import {useState} from "react";
import {useAuth} from "../../hooks";

const {Text} = Typography;
type ParentTweetProps = {
  tweet: Tweet,
  replying: boolean
}

function ParentTweet({tweet, replying}: ParentTweetProps) {
  const {user} = useAuth();
  const [isFollowedByYou, setIsFollowedByYou] = useState(tweet.author.isFollowedByYou);

  return (
    <article className="flex mb-3">
      <div>
        <UserPopover user={tweet.author} isFollowedByYou={isFollowedByYou} setIsFollowedByYou={setIsFollowedByYou}>
          <Avatar
            src={`https://picsum.photos/seed/${tweet.author.username}/400/`}
            size="large"
            alt={tweet.author.username + " photo"}
          />
        </UserPopover>
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
        <Text className={`text-secondary ${replying ? "" : "hover:underline"}`}>{getDateMinimal(tweet.createdAt)}</Text>
        <p><Text className="whitespace-pre-line">{tweet.body}</Text></p>
        {replying ?
          user?.id !== tweet.author.id && <p className="py-4">
            <Text className="text-secondary">Replying to</Text>
            <Text className="text-primary"> @{tweet.author.username}</Text>
          </p> :
          <TweetButtons tweet={tweet}/>}
      </div>
    </article>
  );
}

export default ParentTweet;