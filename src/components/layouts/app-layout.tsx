import React, {useState} from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import Sidebar from "../menus/sidebar";
import MobileNavbar from "../menus/mobile-navbar";

const {Content, Sider} = Layout;

function AppLayout() {
  const [collapsed, setCollapse] = useState(false);

  return (
    <Layout hasSider>
      <Sider
        className="xs:hidden ht:hidden top-0 bottom-0 left-0 overflow-auto h-screen"
        width="22vw"
        breakpoint="xl"
        collapsedWidth="14vw"
        onCollapse={(broken) => setCollapse(broken)}
        style={{transition: "none", position: "fixed", overflow: "auto"}}
      >
        <Sidebar/>
      </Sider>
      <Content
        className={
          `xs:ml-0 ht:ml-0 min-h-screen flex flex-row ht:justify-center 
          ${collapsed ? "ml-[14vw]" : "ml-[22vw]"}`
        }>
        <Outlet/>
        <MobileNavbar/>
      </Content>
    </Layout>
  );
}

export default AppLayout;
