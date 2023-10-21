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
import {MenuItem} from "../../types";
import LogoutPopover from "./logout-popover";

const {Text} = Typography;

function Sidebar() {
  const {user} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "", key: "0", onClick: () => navigate(HOME_ROUTE),
      icon: <img className="w-12 h-10 left-0 absolute" src="/logo.svg" alt="logo"/>,
    },
    {
      label: "Home", key: HOME_ROUTE, onClick: () => navigate(HOME_ROUTE),
      icon: location.pathname === HOME_ROUTE ? <HomeFilled/> : <HomeOutlined/>,
    },
    {
      label: "Explore", key: EXPLORE_ROUTE, onClick: () => navigate(EXPLORE_ROUTE),
      icon: <SearchOutlined className={location.pathname === EXPLORE_ROUTE ? "broad" : ""}/>,
    },
    {
      label: "Notifications", key: "1", icon: <BellOutlined/>, disabled: true
    },
    {
      label: "Messages", key: "2", icon: <MailOutlined/>, disabled: true
    },
    {
      label: "Lists", key: "3", icon: <UnorderedListOutlined/>, disabled: true
    },
    {
      label: "Bookmarks", key: "4", icon: <BookOutlined/>, disabled: true
    },
    {
      label: "Communities", key: "5", icon: <UsergroupAddOutlined/>, disabled: true
    },
    {
      label: "Freemium", key: "6", icon: <TwitterOutlined/>, disabled: true
    },
    {
      label: "Profile", key: PROFILE_ROUTE, onClick: () => navigate(PROFILE_ROUTE),
      icon: location.pathname === PROFILE_ROUTE ? <UserSolid/> : <UserOutlined/>,
    },
    {
      label: "More", key: "7", icon: <EllipsisOutlined/>, disabled: true
    },
  ];

  const avatarItem: MenuItem = {
    key: "8",
    icon: <Avatar src={`https://picsum.photos/seed/${user?.sub}/400/`} size="large" alt={user?.id + " photo"}/>,
    label:
      <div className="flex flex-row justify-between ml-1">
        <div className="flex flex-col">
          <Text strong>{user?.sub}</Text>
          <Text className="text-secondary">@{user?.sub}</Text>
        </div>
        <EllipsisOutlined/>
      </div>,
  };

  return (
    <div className="absolute w-64 right-2 h-screen lg:pt-2 lg:w-16">
      <Menu mode="inline" items={items} selectedKeys={[location.pathname]}/>
      <Button
        shape="round"
        className="bg-primary hover:bg-hover-primary w-[233px] h-[50px] transition-none mt-3 ml-1 lg:hidden"
      >
        <Text strong className="text-[17px]">Tweet</Text>
      </Button>
      {/* Small button */}
      {/*TODO show create tweet modal*/}
      <Button
        shape="round"
        className="bg-primary hover:bg-hover-primary hidden lg:block h-[50px] mt-3 ml-1 transition-none"
        icon={<PencilOutlined className="absolute top-[10px] left-3 w-[26px]"/>}
        style={{width: 50}}
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