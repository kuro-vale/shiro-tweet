import {ArrowLeftOutlined} from "@ant-design/icons";
import SearchBar from "./search-bar";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Tabs, TabsProps} from "antd";
import TweetList from "./tweets/tweet-list";
import {SEARCH_TWEETS_QUERY} from "../graphql/queries";

function ExploreTabs() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const body = search.get("q") || "";
  const items: TabsProps["items"] = [{
    key: "tweets",
    label: "Latest",
    children: <TweetList query={SEARCH_TWEETS_QUERY} filterProp={{body}} emptyMessage={`No results for "${body}"`}/>
  }, {
    key: "users",
    label: "People",
  }];

  return (
    <div className="sticky top-0 bg-transparency z-10 backdrop-blur-md flex flex-col items-center">
      <div className="w-full flex pl-3">
        <button
          type="button"
          className="text-center mr-9 hover:bg-hover-menu rounded-full w-9 h-14"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftOutlined className="text-lg"/>
        </button>
        <div className="w-3/4">
          <SearchBar/>
        </div>
      </div>
      <Tabs
        items={items}
        rootClassName="w-full"
        defaultActiveKey="tweets"
      />
    </div>
  );
}

export default ExploreTabs;