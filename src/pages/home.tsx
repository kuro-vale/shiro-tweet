import TweetList from "../components/tweets/tweet-list";
import TimelineLayout from "../components/layouts/timeline-layout";
import Aside from "../components/menus/aside";
import type {TabsProps} from "antd";
import {Tabs, Typography} from "antd";
import ComposeTweet from "../components/tweets/compose-tweet";

const {Text} = Typography;

function Home() {
  const items: TabsProps["items"] = [{
    key: "1",
    label: "For you",
    disabled: true,
  }, {
    key: "2",
    label: "Following",
  }];

  return (
    <>
      <TimelineLayout>
        <div className="h-[53px] flex items-center">
          <Text strong className="text-white text-xl ml-4">Home</Text>
        </div>
        <Tabs defaultActiveKey="2" items={items}/>
        <div className="xs:hidden px-4">
          <ComposeTweet/>
        </div>
        <TweetList/>
      </TimelineLayout>
      <Aside showSearchBar={true}/>
    </>
  );
}

export default Home;