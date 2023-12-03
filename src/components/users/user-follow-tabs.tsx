import {ArrowLeftOutlined} from "@ant-design/icons";
import {Tabs, TabsProps, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {COMMON_FOLLOWERS_ROUTE} from "../../constants";

const {Text} = Typography;

function UserFollowTabs({username}: { username: string }) {
  const navigate = useNavigate();
  const items: TabsProps["items"] = [{
    key: COMMON_FOLLOWERS_ROUTE.replace(":username", username),
    label: "Followers you know"
  }, {
    key: "following",
    label: "Following"
  }, {
    key: "followers",
    label: "Followers"
  }];

  return (
    <>
      <div className="sticky top-0 bg-transparency z-10 backdrop-blur-md h-14 flex items-center pl-3">
        <button
          type="button"
          className="text-center mr-9 hover:bg-hover-menu rounded-full w-9 h-9"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftOutlined className="text-lg"/>
        </button>
        <Text strong className="text-xl">{username}</Text>
      </div>
      <Tabs
        items={items}
      />
    </>
  );
}

export default UserFollowTabs;