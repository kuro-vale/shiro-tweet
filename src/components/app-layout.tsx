import React from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import Sidebar from "./menus/sidebar";
import MobileNavbar from "./menus/mobile-navbar";

const {Content, Sider} = Layout;

function AppLayout() {
  return (
    <Layout hasSider>
      <Sider
        className="xs:hidden ht:hidden top-0 bottom-0 left-0 overflow-auto h-screen"
        width="30vw"
        breakpoint="xl"
        collapsedWidth="15vw"
        style={{transition: "none", backgroundColor: "black"}}
      >
        <Sidebar/>
      </Sider>
      <Content className="min-h-screen">
        <Outlet/>
        <MobileNavbar/>
      </Content>
    </Layout>
  );
}

export default AppLayout;
