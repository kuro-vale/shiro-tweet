import {ArrowLeftOutlined} from "@ant-design/icons";
import SearchBar from "./search-bar";
import {useNavigate} from "react-router-dom";
import {Tabs, TabsProps} from "antd";

function ExploreTabs() {
  const navigate = useNavigate();
  const items: TabsProps["items"] = [{
    key: "tweets",
    label: "Tweets",
  }, {
    key: "users",
    label: "People",
  }];

  // TODO: finish this
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
      />
    </div>
  );
}

export default ExploreTabs;