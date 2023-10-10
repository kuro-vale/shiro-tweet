import {Button, Menu} from "antd";
import {MenuItem} from "../../types";
import {getItem} from "../../utils";
import {EXPLORE_ROUTE, HOME_ROUTE, PROFILE_ROUTE} from "../../constants";
import {useLocation, useNavigate} from "react-router-dom";
import {EllipsisOutlined, HomeFilled, HomeOutlined} from "@ant-design/icons";
import SearchOutlined from "../icons/search-outlined";
import UserSolid from "../icons/user-solid";
import UserOutlined from "../icons/user-outlined";
import LogoutPopover from "./logout-popover";
import PencilOutlined from "../icons/pencil-outlined";

function MobileNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem("", HOME_ROUTE,
      location.pathname === HOME_ROUTE ? <HomeFilled/> : <HomeOutlined/>,
      false, () => navigate(HOME_ROUTE)),
    getItem("", EXPLORE_ROUTE,
      <SearchOutlined className={location.pathname === EXPLORE_ROUTE ? "stroked" : ""}/>,
      false, () => navigate(EXPLORE_ROUTE)),
    getItem("", PROFILE_ROUTE,
      location.pathname === PROFILE_ROUTE ? <UserSolid/> : <UserOutlined/>,
      false, () => navigate(PROFILE_ROUTE)),
    getItem("", "logout",
      <LogoutPopover>
        <EllipsisOutlined/>
      </LogoutPopover>,
      true),
  ];

  // TODO transparency on scroll
  return (
    <div className="hidden xs:block ht:block mobile-navbar">
      <div className="h-14 mb-5 flex justify-end mr-5">
        {/*TODO show create tweet modal*/}
        <Button
          shape="round"
          className="bg-primary btn-primary-hover w56 h-14 transition-none"
          icon={<PencilOutlined/>}
          title="Tweet"
        />
      </div>
      <Menu
        mode="horizontal"
        items={items}
        className="flex justify-center"
      />
    </div>
  );
}

export default MobileNavbar;