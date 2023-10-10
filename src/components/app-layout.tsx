import React, {useState} from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import Sidebar from "./menus/sidebar";
import MobileNavbar from "./menus/mobile-navbar";

const {Content, Sider} = Layout;

function AppLayout() {
  const [collapsed, setCollapse] = useState(false);

  return (
    <Layout hasSider>
      <Sider
        className="xs:hidden ht:hidden top-0 bottom-0 left-0 overflow-auto h-screen"
        width="30vw"
        breakpoint="xl"
        collapsedWidth="15vw"
        onCollapse={(broken) => setCollapse(broken)}
      >
        <Sidebar/>
      </Sider>
      <Content className={`xs:ml-0 ht:ml-0 min-h-screen ${collapsed ? "ml-[15vw]" : "ml-[30vw]"}`}>
        <Outlet/>
        <MobileNavbar/>
      </Content>
    </Layout>
  );
}

export default AppLayout;
