import {Button, Menu} from "antd";
import {MenuItem} from "../../types";
import {EXPLORE_ROUTE, HOME_ROUTE, USER_ROUTE} from "../../constants";
import {useLocation, useNavigate} from "react-router-dom";
import {EllipsisOutlined, HomeFilled, HomeOutlined} from "@ant-design/icons";
import SearchOutlined from "../icons/search-outlined";
import UserSolid from "../icons/user-solid";
import UserOutlined from "../icons/user-outlined";
import LogoutPopover from "./logout-popover";
import PencilOutlined from "../icons/pencil-outlined";
import {useEffect, useState} from "react";
import ComposeModal from "../modals/compose-modal";
import {useMediaQuery} from "react-responsive";
import {useAuth} from "../../hooks";

function MobileNavbar() {
  const isMobile = useMediaQuery({maxWidth: 500});
  const isTablet = useMediaQuery({maxHeight: 800});
  const location = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const {user} = useAuth();
  const profileRoute = USER_ROUTE.replace(":username", user!.sub);

  const items: MenuItem[] = [
    {
      label: "", key: HOME_ROUTE, icon: location.pathname === HOME_ROUTE ? <HomeFilled/> : <HomeOutlined/>,
      onClick: () => navigate(HOME_ROUTE), style: {marginLeft: "15px", marginRight: "15px"}
    },
    {
      label: "", key: EXPLORE_ROUTE,
      icon: <SearchOutlined className={location.pathname === EXPLORE_ROUTE ? "broad" : ""}/>,
      onClick: () => navigate(EXPLORE_ROUTE), style: {marginLeft: "15px", marginRight: "15px"}
    },
    {
      label: "", key: profileRoute, icon: location.pathname === profileRoute ? <UserSolid/> : <UserOutlined/>,
      onClick: () => navigate(profileRoute), style: {marginLeft: "15px", marginRight: "15px"}
    },
    {
      label: "", key: "logout", style: {marginLeft: "15px", marginRight: "15px"},
      icon: <LogoutPopover><EllipsisOutlined/></LogoutPopover>, disabled: true,
    },
  ];
  useEffect(() => {
    let previousY = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (previousY < scrollY) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
      previousY = scrollY;
    };

    if (isMobile || isTablet) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, isTablet]);

  return (
    <>
      {(isMobile || isTablet) &&
        <nav className={`fixed bottom-0 left-0 w-full h-[132px] ${scrolling ? "opacity-30" : ""}`}
             style={{transitionDuration: "170ms", transitionTimingFunction: "cubic-bezier(0, 0, 1, 1)"}}
        >
          <ComposeModal open={openModal} onClose={() => setOpenModal(false)}/>
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
        </nav>
      }
    </>
  );
}

export default MobileNavbar;