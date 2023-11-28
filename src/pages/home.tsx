import TweetList from "../components/tweets/tweet-list";
import TimelineLayout from "../components/layouts/timeline-layout";
import Aside from "../components/menus/aside";
import type {TabsProps} from "antd";
import {Tabs} from "antd";
import ComposeTweet from "../components/tweets/compose-tweet";
import {INDEX_QUERY} from "../graphql/queries";

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
        <Tabs className="sticky top-0 bg-transparency z-10 backdrop-blur-md" defaultActiveKey="2" items={items}/>
        <div className="xs:hidden ht:hidden px-4 border-b-[1px] border-b-border mt-3">
          <ComposeTweet/>
        </div>
        <TweetList query={INDEX_QUERY} showResult={true}/>
      </TimelineLayout>
      <Aside showSearchBar={true}/>
    </>
  );
}

export default Home;