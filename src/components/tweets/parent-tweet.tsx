import {Tweet} from "../../types";
import {Avatar, Typography} from "antd";
import {getDateMinimal} from "../../utils";
import TweetButtons from "./tweet-buttons";

const {Text} = Typography;
type ParentTweetProps = {
  tweet: Tweet,
  replying: boolean
}

function ParentTweet({tweet, replying}: ParentTweetProps) {
  // TODO: User hover
  return (
    <article className="flex mb-3">
      <div>
        <Avatar
          src={`https://picsum.photos/seed/${tweet.author.username}/400/`}
          size="large"
          alt={tweet.author.username + " photo"}
        />
        <div className={`w-[2px] pt-1 h-full mx-auto ${replying ? "pb-10" : "pb-8"}`}>
          <div className="bg-gray h-full"/>
        </div>
      </div>
      <div className="ml-3 flex-1">
        <Text strong className="hover:underline">{tweet.author.username}</Text>
        <Text className="text-secondary"> @{tweet.author.username}</Text>
        <Text className="text-secondary"> · </Text>
        <Text className="text-secondary hover:underline">{getDateMinimal(tweet.createdAt)}</Text>
        <p><Text className="whitespace-pre-line">{tweet.body}</Text></p>
        {replying ?
          <p className="py-4">
            <Text className="text-secondary">Replying to</Text>
            <Text className="text-primary"> @{tweet.author.username}</Text>
          </p> :
          <TweetButtons tweet={tweet}/>}
      </div>
    </article>
  );
}

export default ParentTweet;