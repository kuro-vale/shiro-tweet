import {Tweet} from "../../types";
import {HeartFilled, HeartOutlined, MessageOutlined, RetweetOutlined} from "@ant-design/icons";
import {useTweetToggles} from "../../hooks";
import {message, Typography} from "antd";
import {useState} from "react";
import ComposeModal from "../modals/compose-modal";

const {Text} = Typography;
type TweetButtonsProps = {
  tweet: Tweet
}

function TweetButtons({tweet}: TweetButtonsProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [openComposeModal, setOpenComposeModal] = useState(false);
  const {
    isHeartedByYou,
    isRetweetedByYou,
    toggleHeart,
    toggleRetweet
  } = useTweetToggles(tweet.isHeartedByYou, tweet.isRetweetedByYou);

  return (
    <>
      {contextHolder}
      <ComposeModal open={openComposeModal} onClose={() => setOpenComposeModal(false)} tweet={tweet}/>
      <div className="flex max-w-md h-5 justify-between my-3 flex-1">
        <div className=" w-full">
          <div className="text-secondary cursor-pointer hover:text-primary w-fit"
               onClick={() => setOpenComposeModal(true)}>
            <MessageOutlined/>
            {tweet.comments > 0 &&
              <Text style={{color: "inherit"}} className="text-secondary px-2">{tweet.comments}</Text>
            }
          </div>
        </div>
        <div className="w-full relative overflow-hidden">
          <div
            className={`${isRetweetedByYou ? "text-retweet" : "text-secondary"} cursor-pointer hover:text-retweet w-fit`}
            onClick={() => toggleRetweet(tweet.id, messageApi)}
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
            onClick={() => toggleHeart(tweet.id, messageApi)}>
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
    </>
  );
}

export default TweetButtons;