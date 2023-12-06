import {ArrowLeftOutlined} from "@ant-design/icons";
import {Tabs, TabsProps, Typography} from "antd";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {COMMON_FOLLOWERS_ROUTE, USER_FOLLOWERS_ROUTE, USER_FOLLOWING_ROUTE} from "../../constants";
import {useAuth, useProfile} from "../../hooks";

const {Text} = Typography;

function UserFollowTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const {profile} = useProfile();
  const {user: currentUser} = useAuth();
  const items: TabsProps["items"] = [{
    key: COMMON_FOLLOWERS_ROUTE.replace(":username", profile!.username),
    label: "Followers you know"
  }, {
    key: USER_FOLLOWING_ROUTE.replace(":username", profile!.username),
    label: "Following"
  }, {
    key: USER_FOLLOWERS_ROUTE.replace(":username", profile!.username),
    label: "Followers"
  }];
  if (profile?.id === currentUser?.id) items.splice(0, 1);

  return (
    <>
      <div className="sticky top-0 bg-transparency z-10 backdrop-blur-md flex items-center flex-col">
        <div className="w-full flex pl-3">
          <button
            type="button"
            className="text-center mr-9 hover:bg-hover-menu rounded-full w-9 h-14"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined className="text-lg"/>
          </button>
          <div className="flex flex-col justify-center">
            <Text strong className="text-xl">{profile?.username}</Text>
            <Text className="text-secondary text-[13px]">@{profile?.username}</Text>
          </div>
        </div>
        <Tabs
          items={items}
          onTabClick={e => navigate(e, {replace: true})}
          defaultActiveKey={location.pathname}
          rootClassName="w-full"
        />
      </div>
      <Outlet/>
    </>
  );
}

export default UserFollowTabs;