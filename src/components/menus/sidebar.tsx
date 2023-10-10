import {Avatar, Button, Menu, Typography} from "antd";
import {
  BellOutlined,
  BookOutlined,
  EllipsisOutlined,
  HomeFilled,
  HomeOutlined,
  MailOutlined,
  TwitterOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {EXPLORE_ROUTE, HOME_ROUTE, PROFILE_ROUTE} from "../../constants";
import {useLocation, useNavigate} from "react-router-dom";
import SearchOutlined from "../icons/search-outlined";
import UserSolid from "../icons/user-solid";
import UserOutlined from "../icons/user-outlined";
import {useAuth} from "../../hooks";
import PencilOutlined from "../icons/pencil-outlined";
import {getItem} from "../../utils";
import {MenuItem} from "../../types";
import LogoutPopover from "./logout-popover";

const {Text} = Typography;

function Sidebar() {
  const {user} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem("", "0", <img src="/logo.svg" alt="logo"/>, false, () => navigate(HOME_ROUTE)),
    getItem("Home", HOME_ROUTE,
      location.pathname === HOME_ROUTE ? <HomeFilled/> : <HomeOutlined/>,
      false, () => navigate(HOME_ROUTE)),
    getItem("Explore", EXPLORE_ROUTE,
      <SearchOutlined className={location.pathname === EXPLORE_ROUTE ? "stroked" : ""}/>,
      false, () => navigate(EXPLORE_ROUTE)),
    getItem("Notifications", "1", <BellOutlined/>, true),
    getItem("Messages", "2", <MailOutlined/>, true),
    getItem("Lists", "3", <UnorderedListOutlined/>, true),
    getItem("Bookmarks", "4", <BookOutlined/>, true),
    getItem("Communities", "5", <UsergroupAddOutlined/>, true),
    getItem("Freemium", "6", <TwitterOutlined/>, true),
    getItem("Profile", PROFILE_ROUTE,
      location.pathname === PROFILE_ROUTE ? <UserSolid/> : <UserOutlined/>,
      false, () => navigate(PROFILE_ROUTE)),
    getItem("More", "7", <EllipsisOutlined/>, true),
  ];

  const avatarItem: MenuItem = {
    key: "8",
    icon: <Avatar src={`https://picsum.photos/seed/${user?.sub}/400/`} size="large" alt={user?.id + " photo"}/>,
    label:
      <div className="flex flex-row justify-between ml-1">
        <div className="flex flex-col">
          <Text strong>{user?.sub}</Text>
          <Text className="color-secondary">@{user?.sub}</Text>
        </div>
        <EllipsisOutlined/>
      </div>,
  };

  return (
    <div className="sidebar">
      <Menu mode="inline" items={items} selectedKeys={[location.pathname]}/>
      <Button
        shape="round"
        className="bg-primary btn-primary-hover w-[233px] h-[50px] transition-none mt-3 ml-1 lg:hidden"
      >
        <Text strong className="text-[17px]">Tweet</Text>
      </Button>
      {/* Small button */}
      {/*TODO show create tweet modal*/}
      <Button
        shape="round"
        className="bg-primary btn-primary-hover hidden lg:block w50 h-[50px] mt-3 ml-1 transition-none"
        icon={<PencilOutlined className="absolute top-[10px] left-3"/>}
        title="Tweet"
      />

      <LogoutPopover>
        <div className="absolute bottom-0 mb-1 w-full lg:bottom-2">
          <Menu mode="inline" items={[avatarItem]} selectable={false}/>
        </div>
      </LogoutPopover>
    </div>
  );
}

export default Sidebar;