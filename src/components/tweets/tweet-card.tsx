import {Tweet} from "../../types";
import {Avatar, Typography} from "antd";
import {getDateMinimal} from "../../utils";
import ParentTweet from "./parent-tweet";
import TweetButtons from "./tweet-buttons";

const {Text} = Typography;

type TweetCardProps = {
  tweet: Tweet
}

function TweetCard({tweet}: TweetCardProps) {
  // TODO: User hover
  return (
    <li className="px-4 pt-3 border-b-[1px] border-b-border">
      {tweet.parent && <ParentTweet tweet={tweet.parent} replying={false}/>}
      <article className="flex">
        <Avatar
          src={`https://picsum.photos/seed/${tweet.author.username}/400/`}
          size="large"
          alt={tweet.author.username + " photo"}
        />
        <div className="ml-3 flex-1">
          <Text strong className="hover:underline">{tweet.author.username}</Text>
          <Text className="text-secondary"> @{tweet.author.username}</Text>
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