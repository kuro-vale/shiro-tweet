import {Tweet} from "../../types";
import {Avatar, message, Typography} from "antd";
import {getDateMinimal, handleError} from "../../utils";
import {HeartFilled, HeartOutlined, MessageOutlined, RetweetOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {HEART_MUTATION, RETWEET_MUTATION, UNHEART_MUTATION, UNRETWEET_MUTATION} from "../../graphql/mutations";

const {Text} = Typography;

type TweetCardProps = {
  tweet: Tweet
}

function TweetCard({tweet}: TweetCardProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isHeartedByYou, setIsHeartedByYou] = useState(tweet.isHeartedByYou);
  const [isRetweetedByYou, setIsRetweetedByYou] = useState(tweet.isRetweetedByYou);
  const [heart] = useMutation(HEART_MUTATION);
  const [unHeart] = useMutation(UNHEART_MUTATION);
  const [retweet] = useMutation(RETWEET_MUTATION);
  const [unRetweet] = useMutation(UNRETWEET_MUTATION);

  const toggleHeart = async () => {
    try {
      if (!isHeartedByYou) {
        setIsHeartedByYou(true);
        await heart({variables: {tweetId: tweet.id}});
      } else {
        setIsHeartedByYou(false);
        await unHeart({variables: {tweetId: tweet.id}});
      }
    } catch (e) {
      await handleError(messageApi, e);
    }
  };

  const toggleRetweet = async () => {
    try {
      if (!isRetweetedByYou) {
        setIsRetweetedByYou(true);
        await retweet({variables: {tweetId: tweet.id}});
      } else {
        setIsRetweetedByYou(false);
        await unRetweet({variables: {tweetId: tweet.id}});
      }
    } catch (e) {
      await handleError(messageApi, e);
    }
  };

  // TODO: User hover
  return (
    <>
      {contextHolder}
      <li className="px-4 pt-3 border-b-[1px] border-b-border">
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
            <div className="flex max-w-md h-5 justify-between my-3 flex-1">
              {/*TODO: compose comment modal*/}
              <div className=" w-full">
                <div className="text-secondary cursor-pointer hover:text-primary w-fit">
                  <MessageOutlined/>
                  {tweet.comments > 0 &&
                    <Text style={{color: "inherit"}} className="text-secondary px-2">{tweet.comments}</Text>
                  }
                </div>
              </div>
              <div className="w-full relative overflow-hidden">
                <div
                  className={`${isRetweetedByYou ? "text-retweet" : "text-secondary"} cursor-pointer hover:text-retweet w-fit`}
                  onClick={toggleRetweet}
                >
                  <RetweetOutlined/>
                  {/*Count without user retweet*/}
                  {tweet.retweets - (tweet.isRetweetedByYou ? 1 : 0) > 0 &&
                    <Text
                      style={{color: "inherit"}}
                      className={`${!isRetweetedByYou ? "" : "-translate-y-full"} px-2 absolute number-transition`}
                    >
                      {tweet.retweets - (tweet.isRetweetedByYou ? 1 : 0)}
                    </Text>}
                  {/*Count with user retweet*/}
                  <Text
                    style={{color: "inherit"}}
                    className={`${isRetweetedByYou ? "" : "translate-y-full"} px-2 absolute number-transition`}
                  >
                    {tweet.retweets + (tweet.isRetweetedByYou ? 0 : 1)}
                  </Text>
                </div>
              </div>
              <div className="w-full relative overflow-hidden">
                <div
                  className={`${isHeartedByYou ? "text-heart" : "text-secondary"} cursor-pointer hover:text-heart w-fit`}
                  onClick={toggleHeart}>
                  {isHeartedByYou ? <HeartFilled className="text-heart"/> : <HeartOutlined/>}
                  {/*Count without user heart*/}
                  {tweet.hearts - (tweet.isHeartedByYou ? 1 : 0) > 0 &&
                    <Text
                      style={{color: "inherit"}}
                      className={`${!isHeartedByYou ? "" : "-translate-y-full"} px-2 absolute number-transition`}
                    >
                      {tweet.hearts - (tweet.isHeartedByYou ? 1 : 0)}
                    </Text>}
                  {/*Count with user heart*/}
                  <Text
                    style={{color: "inherit"}}
                    className={`${isHeartedByYou ? "" : "translate-y-full"} px-2 absolute number-transition`}
                  >
                    {tweet.hearts + (tweet.isHeartedByYou ? 0 : 1)}
                  </Text>
                </div>
              </div>
              <div/>
            </div>
          </div>
        </article>
      </li>
    </>
  );
}

export default TweetCard;