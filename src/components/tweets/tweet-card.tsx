import {Tweet} from "../../types";
import {Avatar, Typography} from "antd";
import {getDateMinimal} from "../../utils";
import {HeartOutlined, MessageOutlined, RetweetOutlined} from "@ant-design/icons";

const {Text} = Typography;

type TweetCardProps = {
  tweet: Tweet
}

function TweetCard(props: TweetCardProps) {
  // TODO: User hover
  return (
    <li className="px-4 pt-3 border-b-[1px] border-b-border">
      <article className="flex">
        <Avatar
          src={`https://picsum.photos/seed/${props.tweet.author.username}/400/`}
          size="large"
          alt={props.tweet.author.username + " photo"}
        />
        <div className="ml-3 flex-1">
          <Text strong className="hover:underline">{props.tweet.author.username}</Text>
          <Text className="text-secondary"> @{props.tweet.author.username}</Text>
          <Text className="text-secondary"> · </Text>
          <Text className="text-secondary hover:underline">{getDateMinimal(props.tweet.createdAt)}</Text>
          <p><Text className="whitespace-pre-line">{props.tweet.body}</Text></p>
          <div className="flex max-w-xs h-5 justify-between my-3">
            {/* TODO */}
            <div className="text-secondary">
              <MessageOutlined/>
              {props.tweet.comments > 0 &&
                <Text className="text-secondary">{props.tweet.comments}</Text>
              }
            </div>
            <div className="text-secondary">
              <RetweetOutlined/>
              {props.tweet.retweets > 0 &&
                <Text className="text-secondary">{props.tweet.retweets}</Text>
              }
            </div>
            <div className="text-secondary">
              <HeartOutlined/>
              {props.tweet.hearts > 0 &&
                <Text className="text-secondary">{props.tweet.hearts}</Text>
              }
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default TweetCard;