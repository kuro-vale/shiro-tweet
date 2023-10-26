import {Button, Menu} from "antd";
import {MenuItem} from "../../types";
import {EXPLORE_ROUTE, HOME_ROUTE, PROFILE_ROUTE} from "../../constants";
import {useLocation, useNavigate} from "react-router-dom";
import {EllipsisOutlined, HomeFilled, HomeOutlined} from "@ant-design/icons";
import SearchOutlined from "../icons/search-outlined";
import UserSolid from "../icons/user-solid";
import UserOutlined from "../icons/user-outlined";
import LogoutPopover from "./logout-popover";
import PencilOutlined from "../icons/pencil-outlined";
import {useState} from "react";
import ComposeModal from "../modals/compose-modal";

function MobileNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const items: MenuItem[] = [
    {
      label: "", key: HOME_ROUTE, icon: location.pathname === HOME_ROUTE ? <HomeFilled/> : <HomeOutlined/>,
      onClick: () => navigate(HOME_ROUTE), style: {marginLeft: "20px", marginRight: "20px"}
    },
    {
      label: "", key: EXPLORE_ROUTE,
      icon: <SearchOutlined className={location.pathname === EXPLORE_ROUTE ? "broad" : ""}/>,
      onClick: () => navigate(EXPLORE_ROUTE), style: {marginLeft: "20px", marginRight: "20px"}
    },
    {
      label: "", key: PROFILE_ROUTE, icon: location.pathname === PROFILE_ROUTE ? <UserSolid/> : <UserOutlined/>,
      onClick: () => navigate(PROFILE_ROUTE), style: {marginLeft: "20px", marginRight: "20px"}
    },
    {
      label: "", key: "logout", style: {marginLeft: "20px", marginRight: "20px"},
      icon: <LogoutPopover><EllipsisOutlined/></LogoutPopover>, disabled: true,
    },
  ];

  // TODO transparency on scroll
  return (
    <>
      <ComposeModal open={openModal} onClose={() => setOpenModal(false)}/>
      <div className="hidden xs:block ht:block fixed bottom-0 left-0 w-full h-[132px]">
        <div className="h-14 mb-5 flex justify-end mr-5">
          <Button
            shape="round"
            className="bg-primary hover:bg-hover-primary h-14 transition-none"
            icon={<PencilOutlined className="w-[26px] h-[26px]"/>}
            style={{width: 56}}
            title="Tweet"
            onClick={() => setOpenModal(true)}
          />
        </div>
        <Menu
          mode="horizontal"
          items={items}
          className="flex justify-center"
        />
      </div>
    </>
  );
}

export default MobileNavbar;