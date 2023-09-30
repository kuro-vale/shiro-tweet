import {Avatar, Button, Menu, MenuProps, Typography} from "antd";
import {Key, MouseEventHandler, ReactNode} from "react";
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
import "./sidebar.css";
import {EXPLORE_ROUTE, HOME_ROUTE, PROFILE_ROUTE} from "../../constants";
import {useLocation, useNavigate} from "react-router-dom";
import SearchOutlined from "../icons/search-outlined";
import UserSolid from "../icons/user-solid";
import UserOutlined from "../icons/user-outlined";
import {useAuth} from "../../hooks";
import PencilOutlined from "../icons/pencil-outlined";

type MenuItem = Required<MenuProps>["items"][number];
const {Text} = Typography;

function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  disabled?: boolean,
  onClick?: MouseEventHandler,
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    label,
    onClick,
    disabled,
    type,
  } as MenuItem;
}

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
    className: "avatar-item",
    icon: <Avatar src={`https://picsum.photos/seed/${user?.sub}/400/`} size="large" alt={user?.id + " photo"}/>,
    label: user?.sub
  };

  return (
    <div className="sidebar">
      <Menu mode="inline" items={items} selectedKeys={[location.pathname]}/>
      {/*TODO trigger modal*/}
      <Button shape="round" className="bg-primary tweet-button">
        <Text strong style={{fontSize: 17}}>Tweet</Text>
      </Button>
      <Button shape="round" className="bg-primary tweet-button-small" icon={<PencilOutlined/>} title="Tweet"/>
      {/*TODO incomplete*/}
      <Menu mode="inline" items={[avatarItem]} selectable={false} className="avatar-menu"/>
    </div>
  );
}

export default Sidebar;