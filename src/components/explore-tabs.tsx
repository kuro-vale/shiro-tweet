import {ArrowLeftOutlined} from "@ant-design/icons";
import SearchBar from "./search-bar";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Tabs, TabsProps} from "antd";
import TweetList from "./tweets/tweet-list";
import {SEARCH_TWEETS_QUERY} from "../graphql/queries";
import SearchUserList from "./users/search-user-list";

function ExploreTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search] = useSearchParams();
  const body = search.get("q") || "";
  const pathName = location.pathname + (!!search.get("q") ? `?q=${body}&f=:tab` : "?f=:tab");
  const items: TabsProps["items"] = [{
    key: "tweets",
    label: "Latest",
    children: <TweetList query={SEARCH_TWEETS_QUERY} filterProp={{body}} emptyMessage={`No results for "${body}"`}/>
  }, {
    key: "users",
    label: "People",
    children: <SearchUserList filterProp={{username: body}}/>
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
        defaultActiveKey={`${search.get("f") || "tweets"}`}
        onTabClick={k => navigate(pathName.replace(":tab", k), {replace: true})}
      />
    </div>
  );
}

export default ExploreTabs;